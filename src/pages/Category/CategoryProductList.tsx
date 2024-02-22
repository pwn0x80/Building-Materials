import ProductList from '@components/Product/ProductList'
import { fetcher } from '@utils/swrFetcher/swrFetcher';
import useSWR from 'swr'
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import React from 'react'
import { Link } from 'react-router-dom';

export const CategoryProductList = (props: {}) => {
  return (
    <div className='pt-12 '>
      <CategoryHeader />
      <div className='max-w-[2000px] mt-1 ax-w-[2036px] mx-auto lg:px-2 px-0 grid gap-x-1 grid-cols-1 lg:grid-cols-[1fr_3fr]'>
        <CategoryOption />
        <ProductList />

      </div>
    </div>
  )
}

interface ICategory {
  cty: String
}

const CategoryOption = () => {
  const { data, error, isLoading } =
    useSWR<ICategory[]>((`${process.env.REACT_APP_API_BASE_URL}category/getAllCategory`), fetcher, {
      revalidateOnFocus: false,
      // revalidateOnMount:false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0
    })
  if (error) {
    return (
      <div>
        error
      </div>
    )
  }
  if (isLoading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div>
      <div className='bg-blue-700 px-5 py-10 rounded-lg'>
        <div className='text-white px-2 py-2 rounded-md bg-blue-900 text-2xl'>Category List </div>

        <div className='flex gap-3 flex-row capitalize lg:flex-col flex-wrap px-3 font-bold text-white'>
          {data?.map((ctyItem) => {
            return (
          <Link to={`/c/${ctyItem?.cty}`}>{ctyItem?.cty}</Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const CategoryHeader = () => {
  return (
    <>
      <header className="sm:block hidden bg-blue-700 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold leading-tight">Explore Our Exciting Category</h1>
          <p className="mt-2 text-lg">Discover a wide range of high-quality products carefully curated just for you.</p>
          <p className="mt-2 text-lg">Discover the best in <span className="text-yellow-300">innovation</span> and <span className="text-yellow-300">creativity</span>.</p>
        </div>
      </header>
      <header className='block sm:hidden text-white bg-blue-700 py-3'>
        <div className='mx-auto text-center container'>
          <h1 className="text-2xl font-bold leading-tight">Explore Our Exciting Category</h1>
        </div>
      </header>
    </>
  )
}
