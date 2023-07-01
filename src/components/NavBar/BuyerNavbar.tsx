import { IconToggle } from "@components/Icons/IconToggle";
import { IconProvider } from "@utils/context/ThemeSwitchContext";
import { SearchLenSvg, CartSvg, LightModeIcon, DarkModeIcon } from "core-ui";
import { themeOptionType, themeTypes } from "types/themes";

const navigation = [
  // { name: 'Dashboard', href: '#', current: true },
  { name: 'Log in', href: '#', current: true },
  { name: 'More', href: '#', current: false },
  { name: 'Cart', href: '#', current: false, icon: <CartSvg /> },
]
const themeOption:themeOptionType = {
  light: "light",
  dark: "dark"
}

const icons:themeTypes = {
  light: <LightModeIcon />,
  dark: <DarkModeIcon />
};
const DarkLightIcon = () => {
  return (
    <IconProvider icons={icons} option={themeOption}>
      <IconToggle />
    </IconProvider>
  )
}

export const BuyerNavbar = (props: {}) => {
  return (
    <nav className="bg-primary fixed w-full left-0">
      <div
        className="nav-responsive">
        <div className='flex lg:w-fit md:w-fit sm:w-full '>

          <div> Logo </div>

          <div className=' bg-white p-1 m-2 rounded flex justify-between w-full'>
            <input name="search-label" placeholder='Search for Products' type="input" className='bg-white  px-1.5 outline-none lg:w-[30vw] md:w-[50vw] sm:w-fit	 py-0.2 text-black-400' />
            <SearchLenSvg color="black" />
          </div>
        </div>
        <div className="inline-flex hidden md:flex ">

          {navigation.map((item) => (
            <a
              className='px-2 flex items-center text-white whitespace-nowrap '
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
        <a
          className='px-2 flex items-center text-white whitespace-nowrap '
        >
          <DarkLightIcon />
        </a>

      </div>
    </nav>
  )
}
