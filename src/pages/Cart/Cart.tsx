import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
const CartItems = ({ cartItemsList, onProductDeleteFromCart }: { cartItemsList: Array<any>, onProductDeleteFromCart: any }) => {
  const containerStyle: React.CSSProperties = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
   return (

    <div className='xl:min-h-[86vh]  min-h-[50vh]'   >
      <div style={{ fontFamily: "Times New Roman" }} className='pb-2 text-3xl  leading-10 pt-4 font-serif font-normal text-green-800'>
        Shopping Card
      </div>



      <div id="scrollCard" className='no-scrollbar overflow-auto xl:h-[73vh] h-[60vh]' >

        {cartItemsList?.map((data) => {

          return (

            <div className='flex w-full no-scrollbar  sm:pr-3 pr-0 py-3'>
              <div className='min-w-[130px] max-w-[120px]  h-[90px]'>

                <img
                  className='rounded-2xl px-2 w-[inherit] h-[inherit]'
                  // src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTetuf9t0YepHBA6MpEmBoXDwScvBqi9LqFtw&usqp=CAU"
                />
              </div>
              <div className='flex md:flex-row	flex-col w-[inherit] justify-around'>
                <div>

                  <p
                    style={containerStyle}
                    className='max-w-[320px] md:max-w-[200px]  min-w-[140px] flex-1'
                  >
                    {data?.name}
                  </p>
                </div>
                <div>
                  <div className='border-4 w-min'>
                    <div className='max-w-[120px] md:py-0 py-2 text-nowrap min-w-12 overflow-hidden text-ellipsis text-sm'>
                      RS. {data?.price}
                    </div>
                  </div>
                </div>


                <div className='flex-2'>
                  <div className='w-min  text-nowrap border-2 rounded-2xl border-gray-500 flex'>
                    <button className='px-2 font-bold' type="submit"><SubIcon /></button>
                    <div className='  text-sm border-2 self-center mx-auto min-w-[83px]  max-w-[83px] text-center	 text-ellipsis overflow-hidden' >{data.qty}</div>
                    <button className='px-2' type="submit"><AddIcon /></button>
                  </div>
                </div>
              </div>
              <div onClick={() => { onProductDeleteFromCart(data) }}  ><CrossIcon /></div>
            </div>
          )
        })}



      </div>

    </div>
  )
}
const CartDetail = ({ cartPrice }: any) => {
  return (
    <div style={{ fontFamily: "Times New Roman" }} className='relative bg-[#9db3c0] p-6 rounded-lg min-h-[80vh] font-serif font-normal'>
      <div id='cartDetail'
        className=''>
        <div className='text-nowrap	 text-white text-3xl leading-10'>
          Cart Details
        </div>

        {cartPrice}
      </div>
      <Link to="/payment">
      <div className='right-0 absolute bottom-0 bg-gray-300 m-5 rounded text-blue-600 px-2 py-1 font-bold'>
        <button className='bottom-1'>Payment </button>
      </div>
      </Link>
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
    // throw new Error("hi") 
  } catch (err: any) {
    // return { status: "error" }
    throw err instanceof Error ? err : new Error(err)
  }
}

const onRemoveProduct = (data: any, cartProductInfo: any) => {
  try {
    return fetch(process.env.REACT_APP_API_BASE_URL + 'cart/removeProduct', {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        accept: "application/json",
      },
      body: JSON.stringify({
        product: cartProductInfo
      })
    }).then(data => data.json()).then((response) => {
      console.log(response)
    })
  } catch (err) {
    console.log(err)
  }
}
export const Cart = (props: {}) => {
  const { data, mutate, error, isLoading } = useSWR(process.env.REACT_APP_API_BASE_URL + 'cart/getAllProduct', cartFetcher)
  const [priceState, setPrice] = useState(0);
  useEffect(() => {
    if (data?.status !== "success") return;
    const totalCartAmount = data?.data?.reduce((amt: any, product: any) => {
      return (product.price * product.qty) + amt
    }, 0)
    setPrice(totalCartAmount.toFixed(2))
  }, [data])
  let onDeleteProductFromCart = (cartProductInfo: any) => {
    if (data?.status !== "success") return;
    const deleteCartItemsList = data.data.filter((item: any) => item.pId !== cartProductInfo.pId)
    const options = {
      optimisticData: { ...data, data: [...deleteCartItemsList] },
      rollbackOnError: true
    }
    let t = mutate(onRemoveProduct(deleteCartItemsList, cartProductInfo), options);

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
  return (
    <div className=' md:pt-[74px] pt-[10px] '>
      <div id="cartWrapper" style={{ overflowWrap: 'anywhere' }} className='container  bg-[#e4e8ed] pt-10 rounded-lg grid  xl:grid-cols-[2fr_1fr] grid-cols-1'>
        <div>
          <CartItems onProductDeleteFromCart={onDeleteProductFromCart} cartItemsList={data?.data} />
        </div>
        <div  >
          <CartDetail cartPrice={priceState} />
        </div>
      </div>

    </div>
  )
}
