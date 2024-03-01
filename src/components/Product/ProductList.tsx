import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { fetcher } from '@utils/swrFetcher/swrFetcher';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { Pagination } from '@components/Pagination/Pagination';
import { RatingStar } from '@components/Rating/RatingStar';
import { calculateRating } from '@components/Rating/calculateRating';


export interface IProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrls: string[];
  description: string
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
  const { showBoundary } = useErrorBoundary()
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
  if (error) showBoundary({ message: "retriving error" })
  const products = data?.[0]?.products ?? [];

  useEffect(() => {
    totalPageCountPaginationTrigger(pageSetfn, data, isLoading);
  }, [data])



  return isLoading ? handleLoading("loading...") :
    products.length <= 0 ? handleNoProductFound("no Product Found") : (
      <>
        {
          products?.map((product: any, key: any) => {
            return (
              <Link to={`/p/${product.name}/${product._id}`} key={key}
                className="border-solid flex-[1_0_100%] border bg-[#f7f7f7f0] gap-y-2 snap-center min-w-64 max-w-64 rounded overflow-hidden bg-gray-50 shadow-lg">
                <div className='flex justify-center h-[200px]' >
                  <img
                    loading='lazy'
                    className="w-full"
                    onError={(ev) => {
                      const target = ev.target as HTMLImageElement;
                      target.src = 'https://st.depositphotos.com/1630589/4148/v/450/depositphotos_41489549-stock-illustration-real-estate.jpg';
                    }}
                    src={
                      `${process.env.REACT_APP_API_SERVER_IMG_BASE_URL}${product?.imageUrls?.[0]}`
                    }
                    alt="Product Image"
                  />
                </div>
                <div className='bg-gray-100'>
                  <div className="px-6 py-4">
                    {product?.rating &&
                      <RatingStar rating={calculateRating(product?.rating)} />}
                    <div className="font-bold text-lg mb-2 line-clamp-2">
                      {product?.name}
                    </div>
                  </div>
                  <div className="px-6 pt-4 pb-2 min-h-16">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {product?.category}
                    </span>
                    <div className="font-bold text-md mb-2 italic font-[#ad0000]">
                      <span>₹ </span>{product?.price}
                    </div>

                  </div>
                </div>
              </Link>
            )
          })
        }
      </>
    )
}
const handleLoading = (loadingMessage: any) => {
  return (
    <>
      {loadingMessage}
    </>
  )
}
const handleNoProductFound = (noProductMessage: any) => {
  return (
    <>
      {noProductMessage}
    </>
  )
}
const totalPageCountPaginationTrigger = (pageSetfn: any, data: any, isLoading: any) => {
  const totalItemsCount = data?.[0]?.count ?? 0;
  if (totalItemsCount === 0 && isLoading) return
  pageSetfn(totalItemsCount)

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

