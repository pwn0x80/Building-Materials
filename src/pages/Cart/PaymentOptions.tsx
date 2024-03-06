import { setCartEmpty } from "@redux/userSlice"
import { error } from 'console'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import "./AddressPayment.css"
export const PaymentOptions = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (formData: any) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}order/placeOrder`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json, text/plain, */*'
      },
      body: JSON.stringify(formData)
    }).then(async (res) => {
      if (res.redirected) {
        const pathUrl = new URL(res.url).pathname
        return navigate(pathUrl, { replace: true })
      } else {
        const response = await res.json()
        if (response?.status?.includes("ORDER_PLACED")) {
            dispatch(setCartEmpty({}))
          //TODO Dispatch update cart details
          navigate("/account/orders", { replace: true });
        }

      }
    })
  }
  return (
    <div className='pt-12 container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DeliveryAddress register={register} errors={errors} />
        <PaymentMethod register={register} errors={errors} />
        <button className="font-bold bg-gray-200 px-3 rounded-md">Pay</button>
      </form>
    </div>
  )
}

const PaymentMethod = ({ register, errors }: any) => {
  return (
    <div>
      <div className=' font-bold'>PAYMENT OPTIONS</div>
      <div>
        <input name="payment/" type="radio"
          value="COD"
          {...register("optPayment", {
            required: { message: "required payment option" },
          }
          )}
        /> COD
      </div>
      <div className='opacity-50'>
        <input disabled name="optPayment" type="radio"
          value="ONLINE"
          {...register("optPayment", {
            required: { message: "required payment option" },
          }
          )}
        /> UPI Payment (Coming Soon)
      </div>
      {errors.optPayment && <div className='italic text-xs text-red-500'>{errors.optPayment.message as string}</div>}
    </div>
  )
}


const DeliveryAddress = ({ register, errors }: any) => {
  return (
    <div className='pb-4'>
      <div className=' font-bold'>DELVIERY ADDRESS</div>
      <div className='pt-3 grid gap-3 containerAddress'>
        <div style={{ gridArea: "A" }}>
          <div className='' style={{ border: '1px solid rgba(0,0,0,.24)' }}>
            <label htmlFor='name'>
              <div className='absolute bg-white px-2' style={{ transform: 'translate(4px,-15px) scale(.85)' }}>
                Full Name
              </div>
            </label>
            <input
              {...register("name", {
                required: { value: true, message: "required name" },
              })}
              className='w-full p-1' type="text" id="name" />
          </div>

          {errors?.name && <div className='italic text-xs text-red-500'>{errors?.name?.message as string}</div>}
        </div>
        <div style={{ gridArea: "B" }}>
          <div style={{ border: '1px solid rgba(0,0,0,.24)' }}>
            <label htmlFor='ph'>
              <div className='absolute bg-white px-2' style={{ transform: 'translate(4px,-15px) scale(.85)' }}>
                Phone Number
              </div>
            </label>
            <input
              {...register("phNo", {
                required: { value: true, message: "required number" }
              })}
              className='w-full p-1' type="number" id="ph" />
          </div>

          {errors?.phNo && <div className='italic text-xs text-red-500'>{errors?.phNo?.message as string}</div>}
        </div>
        <div style={{ gridArea: "C" }}>
          <div style={{ border: '1px solid rgba(0,0,0,.24)' }}>
            <label htmlFor='pincode'>
              <div className='absolute bg-white px-2' style={{ transform: 'translate(4px,-15px) scale(.85)' }}>
                Pincode
              </div>
            </label>
            <input className='w-full p-1' type="number" id="pincode"
              {...register("pincode", {
                required: { value: "true", message: "required pincode" }
              })} />

          </div>

          {errors?.pincode && <div className='italic text-xs text-red-500'>{errors?.pincode?.message as string}</div>}
        </div>
        <div style={{ gridArea: "D" }}>
          <div style={{ gridArea: "D", border: '1px solid rgba(0,0,0,.24)' }}>
            <label htmlFor='locality'>
              <div className='absolute bg-white px-2' style={{ transform: 'translate(4px,-15px) scale(.85)' }}>
                Locality
              </div>
            </label>
            <input className='w-full p-1' type="text" id="locality"
              {...register("locality", {
                required: { value: "true", message: "required locality" }
              })}
            />
          </div>

          {errors.locality && <div className='italic text-xs text-red-500'>{errors.locality.message as string}</div>}
        </div>
        <div style={{ gridArea: "E" }}>
          <div style={{ border: '1px solid rgba(0,0,0,.24)' }}>
            <label htmlFor='address'>
              <div className='absolute bg-white px-2' style={{ transform: 'translate(4px,-15px) scale(.85)' }}>
                Address
              </div>
            </label>
            <input className='w-full p-1' type="text" id="address"
              {...register("address", {
                required: { value: "true", message: "required address" }
              })} />

          </div>

          {errors?.address && <div className='italic text-xs text-red-500'>{errors?.address?.message as string}</div>}
        </div>

        <div style={{ gridArea: "F" }}>
          <div style={{ border: '1px solid rgba(0,0,0,.24)' }}>
            <label htmlFor="city">
              <div className='absolute bg-white px-2 ' style={{ transform: 'translate(4px,-15px) scale(.85)' }}>
                City
              </div>
            </label>
            <input className='w-full p-1' type="text" id="city"
              {...register("city", {
                required: { value: "true", message: "required city" }
              })}
            />
          </div>

          {errors?.city && <div className='italic text-xs text-red-500'>{errors?.city?.message as string}</div>}
        </div>
        <div style={{ gridArea: "G" }}>
          <div style={{ border: '1px solid rgba(0,0,0,.24)' }}>
            <label htmlFor='state'>
              <div className='absolute bg-white px-2' style={{ transform: 'translate(4px,-15px) scale(.85)' }}>
                State
              </div>
            </label>
            <input className='w-full p-1' type="text" id="state"
              {...register("state", {
                required: { value: true, message: "required state" }
              })}
            />
          </div>
          {errors?.state && <div className='italic text-xs text-red-500'>{errors?.state?.message as string}</div>}
        </div>
      </div >
    </div >
  )
}
