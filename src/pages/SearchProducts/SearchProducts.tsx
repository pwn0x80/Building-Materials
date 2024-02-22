
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useParams, useSearchParams } from 'react-router-dom';
import { fetcher } from '@utils/swrFetcher/swrFetcher';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-600 w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>

)
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-600 rotate-180 w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>

)
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


export const SearchProducts = (props: {}) => {
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
        <div className="container grid gap-[0.4rem] place-items-center grid-cols-[repeat(auto-fill,minmax(282px,1fr))] pt-[60px] ">
          <div hidden> <ProductCard pageSetfn={setTotalPageTrigger} pageNumber={pageNumber == null ? 2 : Number(pageNumber) + 1} /></div>
          <ProductCard pageSetfn={setTotalPageTrigger} pageNumber={pageNumber} />
        </div>
        <PaginationBtn totalPage={totalPage} />
      </ErrorBoundary>
    </div>
  )
}


const PaginationBtn = ({ totalPage }: any) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSelectedPageParam = Number(searchParams.get("page"));
  const currentSelectedPage = currentSelectedPageParam === 0 ? 1 : currentSelectedPageParam;
  const showCaseNumber = 5;
  const subtract = 3;
  const [numbers, setNumbers] = useState<number[]>([]);
  useEffect(() => {
    calculateNumbers();
  }, [currentSelectedPage, totalPage]);

  const calculateNumbers = () => {
    let numbers: any = [];
    if (currentSelectedPage >= 3 && currentSelectedPage <= totalPage - 2) {
      let skip = Math.abs(subtract - currentSelectedPage)
      for (let i = 1 + skip; i <= skip + showCaseNumber; i++) {
        numbers.push(i);
      }
    } else {
      if (showCaseNumber > currentSelectedPage) {
        for (let i = 1; i <= (showCaseNumber < totalPage ? showCaseNumber : totalPage); i++) {
          numbers.push(i)
        }
      } else {
        let initialValue = (totalPage - (showCaseNumber - 1)) < 1 ? 1 : (totalPage - (showCaseNumber - 1))
        for (let i = initialValue; i <= totalPage; i++) {
          numbers.push(i)
        }
      }
    }
    setNumbers(numbers);
  };

  const onLeftTrigger = () => {
    if (currentSelectedPage <= 1) return;
    setSearchParams({ page: String(currentSelectedPage - 1) })
  }
  const onRightTrigger = () => {
    setSearchParams({ page: String(currentSelectedPage + 1) })
  }


  return (
    <>
      {totalPage != 0 ?
        <div className={`    place-content-center justify-self-center flex gap-2 py-20`}>
          <button className={`${currentSelectedPage <= 1 ? "invisible" : "visible"}`} onClick={onLeftTrigger} ><ArrowLeftIcon /></button>
          {numbers.map((pageNumber, key) => {
            return (
              <div
                onClick={() => setSearchParams({ page: String(pageNumber) })}
                key={key} className={`${currentSelectedPage === pageNumber ? "bg-blue-100" : "bg-blue-400 text-white"} rounded-full w-8 font-extralight text-sm border-2 border-indigo-400/75 
h-8 items-center flex justify-center`}> {pageNumber}</div>
            )
          })}
          <button
            className={`${currentSelectedPage >= totalPage ? "invisible" : "visible"}`}
            onClick={onRightTrigger}><ArrowRightIcon /> </button>
        </div> : ""
      }
    </>

  )
}

const searchFetcher = async (url:string)=>{

  return await fetch(url).then((data)=>data.json());
}


const ProductCard = ({ pageSetfn, pageNumber }: any) => {
  let { prd} = useParams();
  const { data, error, isLoading } =
    useSWR<any>(
      `${process.env.REACT_APP_API_BASE_URL}product/searchProducts?${(pageNumber == null || pageNumber < 1) ? `page=1` : `page=${pageNumber}`}&param=${prd}`,


      searchFetcher, {
      revalidateOnFocus: false,
      // revalidateOnMount:false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0
    })
  const totalItemsCount = data?.data?.[0]?.count ?? 0;
  const products = data?.data?.[0]?.products ?? [];
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
        no product found
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
                  {/* <p className="min-h-24 text-gray-700 text-base line-clamp-4"> */}
                  {/*   {product?.description} */}
                  {/* </p> */}
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
