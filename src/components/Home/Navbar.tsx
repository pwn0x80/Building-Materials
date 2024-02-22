import React from 'react'
let CartSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  )
}
let SearchLenSvg = () => {
  return (
    <svg aria-hidden="true" className="self-center w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
  )
}

const navigation = [
  // { name: 'Dashboard', href: '#', current: true },
  { name: 'Log in', href: '#', current: true },
  { name: 'More', href: '#', current: false },
  { name: 'Cart', href: '#', current: false, icon: <CartSvg /> },
]
export const Navbar = (props: {}) => {
  return (
    <nav className='bg-gray-50'>
      <div className="flex  justify-around container mx-auto">
          <div className=''></div>
        <div className='flex nowrap'>
          <div> Logo </div>
          <div className=' bg-white p-1 m-2 rounded flex justify-between'>
            <input name="search-label" placeholder='Search for Products' type="input" className='bg-white  px-1.5 outline-none w-[30vw]	 py-0.2 text-black-400' />
            <SearchLenSvg />
          </div>
        </div>
        <div className="flex nowrap">
          {navigation.map((item) => (
            <a
              className='px-2 flex items-center text-white whitespace-nowrap'
              key={item.name}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
            >
              <span className='px-2'>
              {item?.icon ? item.icon : ""}
              </span>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
