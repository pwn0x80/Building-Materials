import React from 'react'
import { Outlet } from 'react-router-dom'
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
  </svg>

)

export const AdminNavbar = (props: {}) => {
  return (
    <div>
      <div className='flex pr-3 gap-2  justify-between  items-center h-12 w-full bg-[hsl(221,39%,11%)]'>
        {/* admin navbar */}
        <div className='flex w-full md:w-5/12 sm:w-7/12 bg-[white] justify-center h-7 rounded px-2'>
          <input placeholder='Hunt for Customers, Not Easter Eggs' className='w-[100%] ' />
          <SearchIcon />
        </div>
        <button className='bg-[darkslategray] px-3 w-[100px] text-nowrap  rounded font-bold h-[35px] text-[white]'>
          Add Item
        </button>
      </div>
      <Outlet />
    </div>
  )
}
