import { IconToggle } from "@components/Icons/IconToggle";
import dark from "@components/theme/darktheme";
import light from '@components/theme/base';
import { applyTheme } from "@components/theme/utils";
import { IconProvider } from "@utils/context/ThemeSwitchContext";
import { SearchLenSvg, CartSvg, LightModeIcon, DarkModeIcon } from "core-ui";
import { useEffect, useReducer, useRef, useState } from "react";
import { initAction, themeAction, themeOptionType, themeReduceType, themeTypes } from "types/themes";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useSWRMutation from 'swr/mutation'
import { useSelector } from "react-redux";
const navigation = [
  // { name: 'Dashboard', href: '#', current: true },
  // { name: 'Log in', href: '/login', current: true },
  // { name: 'More', href: '#', current: false },
  { name: 'Cart', href: '/cart', current: false, icon: <CartSvg /> },
]

const loginNavigation = [
  { name: 'Log in', href: '/login', current: true },
]

const themeOption: themeOptionType = {
  light: "light",
  dark: "dark"
}

const icons: themeTypes = {
  light: <LightModeIcon />,
  dark: <DarkModeIcon />
};

function themeChangeReducer(state: themeReduceType, action: themeAction): themeReduceType {
  if (action.type === "light") {
    applyTheme(light);
    return themeOption.light;
  } else if (action.type === "dark") {
    applyTheme(dark);
    return themeOption.dark;
  }
  return state;
}

const DarkLightIcon = () => {

  function init(): themeReduceType {
    return themeOption.light;
  }
  const [themeState, onThemeDispatch] = useReducer(
    themeChangeReducer,
    themeOption.light,
    () => { applyTheme(light); return "light" }
  );
  return (
    <IconProvider themeState={themeState} icons={icons} option={themeOption} onThemeDispatch={onThemeDispatch}>
      <IconToggle />
    </IconProvider>
  )
}

export const BuyerNavbar = (props: {}) => {
  const [isActiveState, setActiveState] = useState(false);
  const isLogin = useSelector((state: any) => state.userDetail.isUserLogin)
  let isActive = () => {
    window.scrollY > 0 ? setActiveState(true) : setActiveState(false)
  }
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, [])

  return (
    <>
      <nav className={`${isActiveState == true ? 'bg-blue-400' : 'bg-primary'} transition-all ease-out delay-100 z-50 fixed w-full left-0`}>

        {/* <nav className={`${isActiveState ? "bg-blue-300" : 'bg-primary'}  z-50 fixed w-full left-0`}> */}

        <div
          className="nav-responsive">
          <div className='flex lg:w-fit md:w-fit sm:w-full '>
            <Link className="flex justify-center items-center" to="/">
              {/* <div> Logo </div> */}
              <img className="h-8 rounded" src="https://files.catbox.moe/4wg1kp.png" />
            </Link>
            <SearchDropDown />
          </div>
          <div className="sm:inline-flex hidden md:flex ">
            {!isLogin ?
              <NavLink
                style={({ isActive, isPending, isTransitioning }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                  };
                }}
                className='px-2 flex items-center text-white whitespace-nowrap'
                key={'Log in'}
                to={"/login"}
              // aria-current={item.current ? 'page' : undefined}
              >
                {/* <span className='px-2'> */}
                {/* {item?.icon ? item.icon : ""} */}
                {/* </span> */}
                {"Log in"}
              </NavLink> :
              <NavLink
                style={({ isActive, isPending, isTransitioning }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                  };
                }}
                className='min-w-20   px-2 flex items-center text-white whitespace-nowrap '
                key={'account'}
                to={"/account"}
              // aria-current={item.current ? 'page' : undefined}
              >
                {/* <span className='px-2'> */}
                {/* {item?.icon ? item.icon : ""} */}
                {/* </span> */}
                {"Account"}
              </NavLink>
            }

            {navigation.map((item) => (
              <NavLink
                style={({ isActive, isPending, isTransitioning }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                  };
                }}
                className='min-w-24 px-2 flex items-center text-white whitespace-nowrap '
                key={item.name}
                to={item.href}
                aria-current={item.current ? 'page' : undefined}
              >
                <span className='px-2'>
                  {item?.icon ? item.icon : ""}
                </span>
                {item.name}
              </NavLink>
            ))}
          </div>
          <a
            className='px-2 flex items-center text-white whitespace-nowrap '
          >
            <DarkLightIcon />
          </a>

        </div>
      </nav>

      <Outlet />
    </>
  )
}





let curryingSearch = (trigger: any) => {
  let evtTime: any = null
  return (evt: any) => {
    clearTimeout(evtTime)
    evtTime = setTimeout(() => trigger({ param: evt.target.value, page: 1 }), 1200)
  }
}


async function searchProducts(url: string, { arg }: { arg: any }) {
  const searchParams = new URLSearchParams(arg);
  return await fetch(url + "?" + searchParams.toString(), {
    method: 'GET',
  }).then((data) => data.json())
}
const useOutsideClick = (ref: any) => {
  const [show, setShow] = useState(false)
  const onClick = (evt: any) => {
    if (ref.current && !ref.current.contains(evt.target))
      if (show == true)
        setShow(false)
  }

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    }
  })
  return { show, setShow };
}

// ?page=1&param=
const SearchDropDown = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(`${process.env.REACT_APP_API_BASE_URL}product/searchProducts`, searchProducts)
  const navigate = useNavigate();
  const dropDownRef = useRef() as any;
  const { show, setShow } = useOutsideClick(dropDownRef)

  useEffect(() => {
    if (data === undefined) return
    if (!isMutating) {
      if (show === false)
        setShow(true)
    }
  }, [!isMutating])
  const onSubmitTrigger = (evt: any) => {
    evt.preventDefault()
    navigate("/s/" + evt.currentTarget.elements.searchInput.value)

  }
  return (
    <div ref={dropDownRef} className="relative mx-3 my-2  w-[inherit]">
      <form onSubmit={onSubmitTrigger} className='bg-white p-1 w-[inherit]  rounded flex justify-between'>
        <input
          id="searchInput"
          onChange={curryingSearch(trigger)}
          placeholder='Search for Products' type="input" className='bg-white  px-1.5 outline-none lg:w-[30vw] md:w-[50vw] sm:w-fit	 py-0.2 text-black-400' />
        <button type="submit" onClick={() => setShow(false)} >
          <SearchLenSvg color="black" />
        </button>
      </form>

      {show &&
        <div className="w-full overflow-y-scroll h-[25vh] absolute bg-gray-300 px-2">
          {data?.data?.[0].products.length === 0 && <div>no data</div>}
          {(data?.message?.includes("no search words")) && <div>no data</div>}
          {isMutating && <div>loading...</div>}
          {data?.data?.[0].products?.map((product: any, key: any) => {
            return (
              <Link to={`p/${product.name}/${product._id}`} onClick={() => setShow(false)} className="flex">
                <div className="min-w-10 w-10 m-2 flex justify-center  min-h-12 h-12" >
                  <img className="h-full" src={`${process.env.REACT_APP_API_SERVER_IMG_BASE_URL}${product?.imageUrls?.[0]}`} />
                </div>
                <div>
                  <div className=" line-clamp-1 break-all h-5">
                    {product?.name}
                  </div>
                  <Link to={`/c/${product?.category}`} onClick={(e) => e.stopPropagation()} className=" max-w-[max-content] text-blue-700">
                    {product?.category}
                  </Link>
                </div>

              </Link>
            )
          })}
        </div>
      }

    </div>

  )
}
