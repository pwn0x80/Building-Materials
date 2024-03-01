import { removeProductFromCartAction } from '@redux/actions/cartActions'
import { filter } from 'fp/filter'
import { jsonParser } from 'fp/json'
import { pipe } from 'fp/pipe'
import { map, mapLeft, tryCatch } from 'fp/TaskEither'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>

)
const SubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
  </svg>

)
const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
)
const ProductDetails = ({
  productDetails,
  onProductDeleteFromCart,
  onProductQtyUpdate,
  isQtyStateChange
}: { isQtyStateChange: any, productDetails: any, onProductDeleteFromCart: any, onProductQtyUpdate: any }) => {
  const containerStyle: React.CSSProperties = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  return (
    <Link to={`/p/${productDetails.name}/${productDetails.pId}`} className={` ${isQtyStateChange ? "opacity-50" : ""} flex w-full no-scrollbar  sm:pr-3 pr-0 py-3`}>
      <div className='min-w-[120px] w-[130px]  h-[90px]'>
        <img
          className={` rounded-2xl px-2 w-[inherit] h-[inherit]`}
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTetuf9t0YepHBA6MpEmBoXDwScvBqi9LqFtw&usqp=CAU"
          src={`${process.env.REACT_APP_API_SERVER_IMG_BASE_URL}${productDetails?.imgUrls}`}
        />
      </div>
      <div className='flex md:flex-row	flex-col w-[inherit] justify-around'>
        <div>
          <p
            style={containerStyle}
            className='w-[120px] max-w-[120px]  font-bold capitalize flex-1'
          >
            {productDetails?.name}
          </p>
        </div>
        <div>
          <div className='border-4 w-min'>
            <div className='max-w-[120px] w-[100px] font-extralight md:py-0 py-2 whitespace-nowrap min-w-12 overflow-hidden text-ellipsis text-md'>
              RS. {productDetails?.price}

            </div>
          </div>
        </div>


        <div className='flex-2'>
          <div className='w-min  text-nowrap border-2 rounded-2xl border-gray-500 flex'>
            <button disabled={productDetails.qty <= 1 ? true : false} onClick={(evt) => { onProductQtyUpdate(evt, { ...productDetails, qty: productDetails.qty - 1 }) }} className='px-2 font-bold' type="submit"><SubIcon /></button>
            <div onClick={(e) => { e.preventDefault() }} className='  text-sm border-2 self-center mx-auto min-w-[83px]  max-w-[83px] text-center	 text-ellipsis overflow-hidden' >{productDetails.qty}</div>
            <button onClick={(evt) => { onProductQtyUpdate(evt, { ...productDetails, qty: productDetails.qty + 1 }) }} className='px-2' type="submit"><AddIcon /></button>
          </div>
        </div>
      </div>
      <div onClick={(evt) => { evt.preventDefault(); onProductDeleteFromCart(productDetails) }}  ><CrossIcon /></div>
    </Link>

  )
}
const ProductPrice = ({ products }: any) => {
  const [cartPrice, setPrice] = useState(0);

  useEffect(() => {
    if (products?.status !== "success") return;
    const totalCartAmount = products?.data?.reduce((amt: any, product: any) => {
      return (product.price * product.qty) + amt
    }, 0)
    setPrice(totalCartAmount.toFixed(2))
  }, [products])
  return (
    <div style={{ fontFamily: "Times New Roman" }}
      className='flex-col justify-between flex relative bg-[#9db3c0] p-6 rounded-lg min-h-[max-content] xl:min-h-[80vh] font-serif font-normal'>
      <div>
        <div id='cartDetail'
          className=''>
          <div className='text-nowrap	 text-white text-3xl leading-10'>
            Cart Details
          </div>
          <br />
          <div className='flex justify-between text-white pb-1 font-extrabold'>
            <div>Total Items</div>
            <div>{products?.data?.length}</div>
          </div>
          <div className='flex justify-between font-extrabold text-lg text-white'>
            <div>Total Amount</div> <div>₹ {cartPrice}</div>
          </div>
        </div>
      </div>
      <div>
        <Link className='flex justify-end' to="/payment">
          {/* <div className='right-0 absolute bottom-0 bg-gray-300 m-5 rounded text-blue-600 px-2 py-1 font-bold'> */}
          <button className=' bg-gray-300 px-3 py-1 text-blue-600 rounded bottom-1'>Payment </button>
          {/* </div> */}
        </Link>
      </div>
    </div>
  )
}

const cartFetcher = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: 'include',
      headers: {
        accept: "application/json",
      }
    }).then((data) => data.json())
    return response
  } catch (err: any) {
    throw err instanceof Error ? err : new Error(err)
  }
}

const onRemoveProduct = (cartProductInfo: any) => tryCatch(
  async () => await fetch(process.env.REACT_APP_API_BASE_URL + 'cart/removeProduct', {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accept: "application/json",
    },
    body: JSON.stringify({
      product: cartProductInfo
    })
  }).then(data => data.json().then((res: any) => res)),
  (err) => err
)()



export const Cart = (props: {}) => {
  const { data, mutate, error, isLoading } = useSWR(process.env.REACT_APP_API_BASE_URL + 'cart/getAllProduct', cartFetcher)
  const [isQtyStateChange, setQtyStateChange] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  //TODO CHANGE FUNCTION NAME (CONFUSING)
  const removeProduct = async (productInfo: any) => {
    pipe(
      onRemoveProduct,
      map(() => {
        removeProductFromCartAction(dispatch, { productId: productInfo[0].pId })
        mutate({ status: "fulfilled" }, {
          // optimisticData:  { ...data, ...productInfo },
          rollbackOnError: true
        }
        )
      }),
    )(productInfo[0])
  }
  let onDeleteProductFromCart = async (cartProductInfo: any) => {
    if (data?.status !== "success") return;
    pipe(
      filter((item: any) => { return item.pId === cartProductInfo.pId }),
      removeProduct,
    )(data.data)
  }

  const onProductQtyUpdate = (evt: any, product: any) => {
    setQtyStateChange(true)
    evt.preventDefault()
    pipe(
      tryCatch(
        () =>
          fetch(process.env.REACT_APP_API_BASE_URL + "cart/updateQuantity", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
          }).then(jsonParser),
        (err) => "error"
      ),
      map(() => {
        setQtyStateChange(false)
        mutate({ status: "fulfilled" }, {
          // optimisticData:  { ...data, a:"" },
          rollbackOnError: true
        })
      }),
      mapLeft(() => {
        return 'error';
      })
    )(product)
  }


  if (isLoading) {
    return (
      <>
        loading...
      </>
    )
  }
  if (error) {
    return (
      <div className='pt-20'>
        something went wrong
        {error?.message}
      </div>
    )
  }

  return (data?.status.includes("USER_NOT_LOGIN")) ?
    (
      <div className='md:pt-[74px] pt-[10px] '>
        <div id="cartWrapper" style={{ overflowWrap: 'anywhere' }} className='container  bg-[#e4e8ed] pt-10 rounded-lg xl:min-h-[86vh]  min-h-[50vh]'>
          <div>
            <p className="text-center text-gray-700 font-bold text-xl">Please log in to view or add items to your cart.</p>
            <div className="flex justify-center mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate("/login")}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (data?.data?.length <= 0) ? (
      <div className='md:pt-[74px] pt-[10px] '>
        <div id="cartWrapper" style={{ overflowWrap: 'anywhere' }} className='container  bg-[#e4e8ed] pt-10 rounded-lg xl:min-h-[86vh]  min-h-[50vh]'>
          <div>
            <p className="text-center text-gray-700 font-bold text-xl">There are currently no items in your cart.</p>
            <div className="flex justify-center mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate("/")}>
                Home
              </button>
            </div>
          </div>
        </div>
      </div>

    ) : (
      <div className=' md:pt-[74px] pt-[10px] '>
        <div id="cartWrapper" style={{ overflowWrap: 'anywhere' }} className='container  bg-[#e4e8ed] pt-10 rounded-lg grid  xl:grid-cols-[2fr_1fr] grid-cols-1'>
          <div className='xl:min-h-[86vh]  min-h-[50vh]'   >
            <div style={{ fontFamily: "Times New Roman" }} className='pb-2 text-3xl  leading-10 pt-4 font-serif font-normal text-green-800'>
              Shopping Card
            </div>
            <div id="scrollCard" className='no-scrollbar overflow-auto xl:h-[73vh] h-[53vh]' >
              {data?.data?.map((productDetails: any) => {
                return (
                  <div>
                    <ProductDetails
                      onProductQtyUpdate={onProductQtyUpdate}
                      onProductDeleteFromCart={onDeleteProductFromCart}
                      productDetails={productDetails}
                      isQtyStateChange={isQtyStateChange}
                    />
                  </div>
                )
              })}
            </div >
          </div >
          <div  >
            <ProductPrice products={data} />
          </div>
        </div>

      </div>
    )
}
