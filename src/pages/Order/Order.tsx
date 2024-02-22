import React from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
const orderFetcher = async (url: string) => {
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

export const Order = (props: {}) => {
  const { data, mutate, error, isLoading } = useSWR(process.env.REACT_APP_API_BASE_URL + 'order/getUserOrder', orderFetcher)
  if (isLoading) {
    return (
      <div className='pt-16'>
        loading
      </div>
    )
  }
  if (error) {
    return (
      <div>
      </div>
    )
  }
  return (
    <div className='pt-16 mr-auto ml-auto max-w-[1900px] pl-3 pr-3'>
      <div className=' gap-2 md:gap-0 md:grid-cols-[300px_1fr] grid'>
        <OrderFilter />
        <OrderList orders={data} />
      </div>
    </div>
  )
}

const OrderList = ({ orders }: any) => {
  let { data,
    error,
    trigger,
    reset,
    isMutating
  } = useSWRMutation(
    process.env.REACT_APP_API_BASE_URL,
    async (baseUrl: string, { arg }: {arg:any}) => {
      return fetch(baseUrl + arg.endpoint, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify({
          ordId:arg.ordId,
          prdId:arg.prdId
        })
      }).then((res) =>
        res.json()
      )
    }
  )

  if (orders.status !== "success") {
    return (
      <>
        no vorder found
      </>
    )
  }

  const onOrderCancel = (prdId: string, ordId: string) => {
    trigger({ ordId: ordId, prdId: prdId, endpoint: "order/cancelOrder" })
  }

  return (
    <div className='grid gap-y-2 text-sm'>
      {orders?.data?.map((order: any, key: any) => {
        return (
          order?.products.map((product: any) => {
            return (
              <div>
                <div className='gap-y-2 gap-x-2 grid grid-cols-3 sm:grid-cols-4  p-[12px]' style={{ border: "solid 1px" }}>
                  <div className='md:w-20 w-10'>
                    <img src="https://rukminim2.flixcart.com/image/k6fd47k0pkrrdj/mouse-refurbished/r/w/3/a-optical-mouse-s500-hp-original-imafjy3fqbyxdbhk.jpeg" />
                  </div>
                  <div>
                    <span>{product?.name}</span>
                  </div>
                  <div>
                    ₹{product?.price}
                  </div>
                  <div>
                    {/* <div> green</div> */}
                    {/* //TODO check from product_order_status */}
                    <span className='block'>Refund Cancelled</span>
                    <span className='block text-xs'> {order?.order_status === "complete" ? "Pending" : "check from product_status"}</span>
                  </div>
                  <div>
                    <button className='bg-[#ff2417] text-white px-2 py-1 rounded-sm font-bold' style={{ gridColumnStart: '3' }}>Refund</button>
                  </div>
                  <div>
                    <button className='bg-[#ff2417] text-white px-2 py-1 rounded-sm font-bold' onClick={() => onOrderCancel(product?.prd_order_id, order?._id)} >Cancel</button>
                  </div>
                </div>
              </div >
            )
          }))
      })}
    </div >
  )
}


const OrderFilter = () => {
  return (

    <div className=' '>
      <div className='min-h-52  rounded-md bg-gray-200 mx-9 px-4 py-2 sticky top-16'>

        <div className='font-bold pb-3'>Filters</div>
        <div className='text-sm'>
          <div className='font-bold pb-1'>ORDER STATUS</div>
          <p className='pb-1'>
            <input type="radio" name="ordStatus" />
            <span className='pl-2'>
              On the Way
            </span>
          </p>
          <p className='pb-1'>
            <input type="radio" name="ordStatus" />
            <span className='pl-2'>
              Delivered
            </span>
          </p>
          <p className='pb-1'>
            <input type="radio" name="ordStatus" />
            <span className='pl-2'>
              Cancelled
            </span>
          </p>
          <p className='pb-1'>
            <input type="radio" name="ordStatus" />
            <span className='pl-2'>
              Returned
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
