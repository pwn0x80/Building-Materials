import React, { useState, useEffect, useRef, Suspense } from 'react'
import { RatingStar } from '@components/Rating/RatingStar';
import { LeftArrowSvg, RightArrowSvg } from "core-ui/index"
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import useSWR from 'swr'
import { fetcher, IProduct } from '@utils/swrFetcher/swrFetcher';
import { Link } from 'react-router-dom';
import { LoaderSkeleton } from './LoaderSkeleton';
import { calculateRating } from '@components/Rating/calculateRating';
import ProductList from '@components/Product/ProductList';
function fallbackRender({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

export default function ScrollCard() {
  const scrollCardRef = useRef<HTMLDivElement | null>(null);
  const scrollPage = (direction: 'right' | 'left') => {
    const scrollAmount = 300;
    if (scrollCardRef.current?.children) {
      if (direction === 'right') {
        if (scrollCardRef.current.scrollLeft !== null) {
          scrollCardRef.current.scrollLeft += scrollAmount;
        }
      } else {
        if (scrollCardRef.current.scrollLeft !== null) {
          scrollCardRef.current.scrollLeft -= scrollAmount;
        }
      }
    }
  };

  return (

    <div className="container">
      <div id="scroll-buttons" className={"flex justify-end"}>

        <button onClick={() => scrollPage('left')}><LeftArrowSvg /> </button>
        <button onClick={() => scrollPage('right')}><RightArrowSvg /></button>
      </div>
      <div id="scrollCard" ref={scrollCardRef} className='no-scrollbar  scroll-smooth flex overflow-x-auto snap-mandatory snap-x gap-1'>
        <ErrorBoundary
          fallbackRender={fallbackRender}
          onReset={(details) => {
            console.log(details)
          }}
        >
          <Card />
        </ErrorBoundary>
      </div>
    </div>
  )
}


function Card() {
  const { data, error, isLoading } = useSWR<IProduct[]>((`${process.env.REACT_APP_API_BASE_URL}product/getProductWithOptions`), fetcher, {
    revalidateOnFocus: false,
    // revalidateOnMount:false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0
  })
  const { showBoundary } = useErrorBoundary();
  if (error) {
    showBoundary({ message: 'retriving error' });
  }
  if (isLoading) {
    return (
      <LoaderSkeleton />
    )
  }

  return (
    <>
      {data?.map((product: IProduct, keys) => (
        <Link to={`p/${product.name}/${product._id}`} key={product._id} className="border-solid flex-[1_0_100%] border bg-[#f7f7f7f0] snap-center min-w-[125px] max-w-[250px] rounded overflow-hidden bg-gray-50 shadow-lg">

          <div className='flex min-h-[250px] mb-1'>
            <img
              loading='lazy'
              className="w-full"
              onError={(ev) => {
                const target = ev.target as HTMLImageElement;
                target.src = 'https://st.depositphotos.com/1630589/4148/v/450/depositphotos_41489549-stock-illustration-real-estate.jpg';
              }}
              src={
                `${process.env.REACT_APP_API_SERVER_IMG_BASE_URL}${product?.imageUrls[0]}`
              }
              alt="Product Image"
            />
          </div>
          <div className="px-6 py-4">
          <RatingStar rating={calculateRating(product?.rating)}/>
            <div className="font-bold text-md mb-2 line-clamp-2 break-words min-h-[55px]">
              {product?.name}
            </div>
            <div className="">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product?.category}</span>
            </div>

            <div className="font-bold text-md mb-2 italic font-[#ad0000]">
              <span>₹ </span>{product?.price}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};
