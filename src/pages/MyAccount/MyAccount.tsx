import React from 'react'
import { Link } from 'react-router-dom'
const OrderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
  </svg>
)
const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
)
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
  </svg>
)
export const MyAccount = (props: {}) => {
  return (
    <div className='pt-16 container'>
      <div className='sm:grid-cols-[1fr_3fr] grid-cols-[1fr] grid gap-3'>
        <div>
        <div className='sticky top-16  drop-shadow-lg rounded px-2 justify-around py-3 bg-white sm:block flex'>

          <div className='p-2 flex gap-1 sm:flex-row flex-col items-center'>
            <span>
              <ProfileIcon />
            </span>
            <span>
              Profile
            </span>
          </div>
          <Link to="/orders" className='p-2 flex gap-1 sm:flex-row flex-col items-center'>
            <span>
              <OrderIcon />
            </span>
              Order
          </Link>
          <div className='items-center p-2 flex gap-1 sm:flex-row flex-col'>
            <span>
              <LogoutIcon/>
            </span>
            <span>
              Logout
            </span>
          </div>
          </div>
        </div>
        <div className='bg-red-50'>
          <div>Coming Soon Profile Page</div>
        </div>
      </div>
    </div>
  )
}
