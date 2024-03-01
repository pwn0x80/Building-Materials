
import { Link, useNavigate, useParams } from 'react-router-dom'

import useSWR from 'swr'
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import React, { useEffect, useRef, useState } from 'react'
import { LoaderSkeleton } from '../../pages/SingleProduct/LoaderSkeleton';
import { fetcher } from '@utils/swrFetcher/swrFetcher';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, IUserStore, removeProductFromCart } from '@redux/userSlice';
import { isNone, none, some, match } from 'fp/option';
import { addProductToCartAction, removeProductFromCartAction } from '@redux/actions/cartActions';
import { pipe } from "fp/pipe"
import { tryCatch } from 'fp/TaskEither';
import { jsonParser } from 'fp/json';
const LeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
)
const RightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>

)
interface IProduct {
  _id: string;
  category: string;
  description: string;
  imageUrls: string[];
  name: string
  price: number
  status: boolean
}


export const SingleProductDetailCard = () => {
  let { prdName, id } = useParams();
  const { data, error, isLoading } = useSWR<IProduct>((`${process.env.REACT_APP_API_BASE_URL}product/getProductById?pdName=${prdName}&pdId=${id}`), fetcher)
  const scrollCardRef = useRef<HTMLDivElement | null>(null);
  const [stateReadMore, setReadState] = useState(true)
  const isLoginStore = useSelector<{ userDetail: IUserStore }>(state => state?.userDetail?.isUserLogin);
  const cartStore = useSelector((state: { userDetail: IUserStore }) => state?.userDetail?.cart.products);
  const [onBuyState, setOnBuyState] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const onAddToCart = async (data: any) => {
    try {
      if (!isLoginStore) { navigate("/login"); return }
      if (!cartStore) { return }
      pipe(isProductInCart(cartStore),
        await match(
          async () => { await addToCart(data, dispatch) },
          () => { navigate("/cart") }
        ))(data._id)
    } catch (err: any) {
      console.log(err)
    }

  }
  const onBuyProduct = async (data: any) => {
    try {
      if (!isLoginStore) navigate("/login")
      if (!cartStore) { return }
      setOnBuyState(true);
      pipe(
        isProductInCart(cartStore),
        await match(
          async () => { await addToCart(data, dispatch); navigate("/cart") },
          () => { navigate("/cart") }
        )
      )(data._id)
    } catch (err) {
      console.log(err);
    }
  }


  const isLongDescription = (data?.description.length === undefined ? 0 : data?.description.length) > 324;
  const { showBoundary } = useErrorBoundary();
  if (error) {
    showBoundary({ message: 'retriving error' });
  }
  if (isLoading) {
    return (
      <div>
        <LoaderSkeleton />
      </div>
    )
  }

  const scrollPage = (direction: 'right' | 'left') => {
    const scrollAmount = scrollCardRef.current?.children[1].clientWidth || 500;
    if (scrollCardRef.current) {
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


  if (data == undefined) {
    return (
      <>
        404 Error
      </>
    )
  }

  return (
    <div className='grid gap-9 grid-cols-1 sm:grid-cols-[minmax(300px,1fr)_minmax(120px,1fr)]'>

      <div className='relative h-[200px] sm:h-[400px]'>
        <div ref={scrollCardRef} className='flex scroll-smooth snap-mandatory snap-x h-[100%]  overflow-auto no-scrollbar
            place-self-center flex-row '>
          <div onClick={() => scrollPage('left')} className='absolute top-2/4  text-gray-300'> <LeftIcon /> </div>
          {data?.imageUrls.map((url, keys) => (
            <img className={`flex-[1_0_100%]  snap-center`}
              loading='lazy'
              src={`${process.env.REACT_APP_API_SERVER_IMG_BASE_URL}${url}`}
              onError={(ev) => {
                const target = ev.target as HTMLImageElement;
                target.src = 'https://st.depositphotos.com/1630589/4148/v/450/depositphotos_41489549-stock-illustration-real-estate.jpg';
              }}
            />
          ))}
          <div onClick={() => scrollPage('right')} className='absolute right-0 top-2/4  text-gray-300'> <RightIcon /> </div>
        </div>
      </div>

      <div>
        <div className='line-clamp-4	 font-extrabold  text-[1.2rem] sm:text-[1.7rem] capitalize pt-3'>{data?.name}</div>
        <div className='font-bold text-[1.3rem]'>₹ {data?.price}</div>

        <div className='flex gap-2'>
          <div className='bg-gray-300 min-w-31 min-h-fit '>
            {isNone(isProductInCart(cartStore)(data?._id)) ?
              <button onClick={() => onAddToCart(data)}
                className='px-3 text-sm py-2 rounded-sm uppercase w-32 font-bold text-[0.7rem] sm:text-[0.8rem]'>
                Add to Cart</button> :
              <Link to={"/cart"}>
                <button
                  className='px-3 text-sm py-2 rounded-sm uppercase w-32 font-bold  text-[0.9rem] sm:text-[0.8rem]'>
                  Go to Cart </button>
              </Link>
            }
          </div>
          <div className='bg-[#C2EDCE] '>
            <button onClick={() => onBuyProduct(data)} className=' px-3 py-2 rounded-sm uppercase font-bold w-28 text-[0.8rem] sm:text-[0.8rem]' >{!onBuyState ? "Buy Now" : "loading..."}</button>
          </div>
        </div>

        <div className='py-2'>
          <div className='font-bold text-gray-500 text-nowrap uppercase text-[0.8rem] pb-1'>product details</div>
          <p className={`font-bold break-words ${isLongDescription ? (stateReadMore ? 'line-clamp-4' : 'line-clamp-none') : 'line-clamp-none'}`}>
            {data?.description}
          </p>

          {isLongDescription && (
            <button className='pb-[100px]' onClick={() => setReadState(state => (!state))}>
              {stateReadMore ? 'view more' : 'view less'}
            </button>
          )}

        </div>
      </div>
    </div >
  )
}



const isProductInCart = (cartStore: any) => (productId: string) => {
  if (!cartStore) return none;
  for (let product of cartStore) {
    if (product?.pId == productId) {return some(product); }
  }
  return none;
}

const addToCart = async (data: any, dispatch: any) => {
  addProductToCartAction(data, dispatch)
  let prd = {
    data: {
      id: data?._id.toString(),
      inventoryId: data?.inventoryId,
      name: data?.name,
      qty: data?.qty,
      price: data?.price,
      imgUrls: data?.imageUrls[0]
    }
  }
  return tryCatch(
    () => fetch(process.env.REACT_APP_API_BASE_URL + "cart/addProduct", {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prd)
    }).then(jsonParser)
      .then((data) => {
        if (data.status.includes("ERROR")) {
          throw (data.message)
        }
      }),
    (err) => { removeProductFromCartAction(data._id, dispatch) }
  )()
}

