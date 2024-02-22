
import React, { useEffect, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";
const initialState: any = {
  email: "",
  password: ""
}

const userReducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case 'email':
      return {
        ...state,
        value: state.email + payload
      };
    case "password":
      return {
        ...state,
        value: state.password + payload
      }
    default:
      return state;
  }

}

export const UserRegister = (props: {}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState("");
  const [userFormReducer, dispatchFormReducer] = useReducer(userReducer, initialState);
  const onSubmit = async (registerData: any) => {
    const { email, password } = registerData;

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}auth/register`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    setStatus(data?.message)
  }
  return (
    <div className='pt-[60px] pb-[70px] md:pb-0 flex flex-row '>
      <div className='flex-1  mt-20 sm:place-self-center'>

        <div className='sm:w-[53vw] md:w-[46vw] lg:w-[40vw] w-[100vw] flex place-content-center'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <img className='sm:hidden' src={process.env.PUBLIC_URL + '/images/feature_card/house.svg'} />
            <div style={{ fontFamily: "Times New Roman" }} className='text-3xl leading-10 font-serif font-normal text-green-800'>
              Create your account

            </div>
            <div className='text-sm font-bold text-[darkslategrey]'>Email Address</div>

            <input className='border-2 rounded-md border-double px-3 w-[300px] border-sky-950'
              type="email" placeholder='email'

              maxLength={50}
              {...register("email", {
                required: { value: true, message: "required email" },
              })}
            ></input>
            {errors.email && <div className='italic text-xs text-red-500'>{errors.email.message as string}</div>}
            <div className='text-sm font-bold text-[darkslategrey]'>Password</div>
            <input className='border-2 rounded-md border-double px-3 w-[300px] border-sky-950'
              maxLength={20}
              type="password" placeholder="password"
              {...register("password", {
                required: { value: true, message: "required password" },
                minLength: { value: 4, message: "min length of password 4" },
                maxLength: { value: 20, message: "max length" }
              })}
            ></input>
            {errors.password && <div className='italic text-xs text-red-500'>{errors.password.message as string}</div>}
            {/* {errors ? "saddas" : ""} */}
            <div className='text-sm italic font-bold text-[darkslategrey]'>Have an account? Login In now</div>
            <div className='pt-3'>
              <button className='bg-gray-300 text-gray-800 md:w-3/12 w-[300px]  h-[30px] rounded-md'>Sign up</button>
            </div>
            <div className='pt-3'>
              {!status?.includes("Registration successful") && (
                <div className='wrap text-xs italic font-bold text-[darkred]'>{status}</div>
              )}
              {status?.includes("Registration successful") && (
                <Navigate to="/login" replace={true} />
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="bg-blue-300 flex-2">
        <img className='h-[94vh] object-cover w-screen' src="https://www.shutterstock.com/shutterstock/photos/2312434271/display_1500/stock-vector-traffic-symphony-an-abstract-impression-of-urban-chaos-2312434271.jpg" />
      </div>


    </div>
  )
}
