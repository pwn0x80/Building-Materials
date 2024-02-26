import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useParams, useSearchParams } from 'react-router-dom';
import { fetcher } from '@utils/swrFetcher/swrFetcher';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { Pagination } from '@components/Pagination/Pagination';


export interface IProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrls: string[];
  description: string
}
function fallbackRender({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  let pageNumber = searchParams.get("page")
  const [totalPage, setTotalPage] = useState(0);
  let setTotalPageTrigger = (pg: number) => {
    setTotalPage(pg)
  }
  return (
    <div>
      <ErrorBoundary
        fallbackRender={fallbackRender}
        onReset={(details) => {
          console.log(details)
        }}
      >
        <div className=" grid gap-[0.4rem] place-items-center grid-cols-[repeat(auto-fill,minmax(282px,1fr))] pt-[60px] ">
          <div hidden> <ProductCard pageSetfn={setTotalPageTrigger} pageNumber={pageNumber == null ? 2 : Number(pageNumber) + 1} /></div>
          <ProductCard pageSetfn={setTotalPageTrigger} pageNumber={pageNumber} />
        </div>
        <Pagination 
          totalPage={totalPage}
          currentPage={searchParams.get("page")}
          setPage={searchParams}
        />
        
      </ErrorBoundary>
    </div>
  )
}





const ProductCard = ({ pageSetfn, pageNumber }: any) => {
  let { cty } = useParams();
  const { data, error, isLoading } =
    useSWR<any>((
      `${process.env.REACT_APP_API_BASE_URL}product/getProductBycategory?category=${cty}${(pageNumber == null || pageNumber < 1) ? `&page=1` : `&page=${pageNumber}`}`
    ), fetcher, {
      revalidateOnFocus: false,
      // revalidateOnMount:false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0
    })
  const totalItemsCount = data?.[0]?.count ?? 0;
  const products = data?.[0]?.products ?? [];
  useEffect(() => {
    if (totalItemsCount === 0 && isLoading) return
    pageSetfn(totalItemsCount)
  }, [data])

  const { showBoundary } = useErrorBoundary()
  if (error) {
    showBoundary({ message: "retriving error" })
  }
  if (isLoading) {
    return (
      <div>
        loading...
      </div>
    )
  }
  if (products.length === 0) {
    return (
      <>
        No Product found.
      </>
    )
  }

  return (
    <>
      {
        products?.map((product: any, key: any) => {
          return (
            <div key={key} className=" rounded-md gap-x-1 overflow-hidden min-w-64 max-w-64  shadow-lg">
              <div className='flex justify-center h-[200px]' >
                <img className="w-fit" src="https://5.imimg.com/data5/SELLER/Default/2021/6/CI/XK/WT/9525668/cement-250x250.jpg" alt="Sunset in the mountains" />
              </div>
              <div className='bg-gray-100'>
                <div className="px-6 py-4">
                  <div className="font-bold text-lg mb-2 line-clamp-2">
                    {product?.name}
                  </div>
                </div>
                <div className="px-6 pt-4 pb-2 min-h-16">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {product?.category}
                  </span>
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}
