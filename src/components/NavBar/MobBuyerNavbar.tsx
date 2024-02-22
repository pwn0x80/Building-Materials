import { CartSvg, HomeSvg, ProfileSvg } from 'core-ui'
import { Outlet,Link } from 'react-router-dom'

const BTN_TXT = {
  account: "Account",
  home: "Home",
  cart: "Cart"
}
const navigation = [
  { name: 'Account', href: '/login',  icon: <ProfileSvg /> },
  { name: 'Home', href: '/', icon: <HomeSvg /> },
  { name: 'Cart', href: '/cart',  icon: <CartSvg /> },
]
export const MobBuyerNavbar = (props: {}) => {
  return (
    <>
      <nav className='md:hidden sm:visible'>
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-secondary border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
            {navigation.map((item,key) => (
                <Link to={item.href} type="button" className="inline-flex flex-col items-center justify-center px-5  group">
                  {item.icon}
                  <span className="text-sm text-btnBottomNavbar dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{item?.name}</span>
                </Link>
            ))}


            {/* <button type="button" className="inline-flex flex-col items-center justify-center px-5  group"> */}
            {/*   <HomeSvg /> */}
            {/*   <span className="text-sm text-btnBottomNavbar dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{BTN_TXT.home}</span> */}
            {/* </button> */}

            {/* <button type="button" className="inline-flex flex-col items-center justify-center px-5  group"> */}
            {/*   <CartSvg /> */}
            {/*   <span className="text-sm text-btnBottomNavbar dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{BTN_TXT.cart}</span> */}
            {/* </button> */}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
