import React, { Suspense, useEffect } from 'react';
import { MobBuyerNavbar } from '@components/NavBar/MobBuyerNavbar';
import { BuyerNavbar } from '@components/NavBar/BuyerNavbar';
import { UserLogin } from '@pages/Login/UserLogin';
import { UserRegister } from "@pages/Register/UserRegister";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@pages/Home/Home';
import { useDispatch } from 'react-redux';
import { AdminSideNavbar } from '@components/NavBar/AdminSideNavbar';
import { AdminNavbar } from '@components/NavBar/AdminNavbar';
import { AddProduct } from '@pages/AdminDashboard/AddProduct';
import { SingleProduct } from '@pages/SingleProduct/SingleProduct';
import { CategoryProductList } from '@pages/Category/CategoryProductList';
import { AddCategory } from '@pages/AdminDashboard/AddCategory';
import { SearchProducts } from '@pages/SearchProducts/SearchProducts';
import { Cart } from '@pages/Cart/Cart';
import { PaymentOptions } from '@pages/Cart/PaymentOptions';
import { Order } from '@pages/Order/Order';
import { MyAccount } from '@pages/MyAccount/MyAccount';
import { Location } from '@pages/AdminDashboard/Location';
import isUserLoginAndUpdateCart from 'auth/isLoginAndUpdateCart';
import { UserProtectedRoute } from 'route/UserProtectedRoute';
import { AdminProtectedRoute } from 'route/AdminProtectedRoute';
const AdminPanel = React.lazy(() => import("@pages/AdminDashboard/AdminPanel"))


const AdminDashboardRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route  element={<AdminProtectedRoute />}>
          <Route element={<AdminSideNavbar />}>
            <Route element={<AdminNavbar />}>
              {/* <Route element={<MobBuyerNavbar />}> */}
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/product/add" element={<AddProduct />} />
              <Route path="/admin/category/add" element={<AddCategory />} />
              <Route path="/admin/location" element={<Location />} />
              </Route>
            </Route>
          </Route>
          {/* </Route> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}


const VisitorRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BuyerNavbar />} >
          <Route element={<MobBuyerNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/c/:cty" element={<CategoryProductList />} />
            <Route path="/s/:prd" element={<SearchProducts />} />

            <Route  element={<UserProtectedRoute />}>
              <Route path="/orders" element={<Order />} />
              <Route path="/account" element={<MyAccount />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentOptions />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/p/:prdName/:id" element={<SingleProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    isUserLoginAndUpdateCart(dispatch)
  }, [])

  return (
    <>
      <AdminDashboardRouter />
      <VisitorRouter />
    </>

  )

}

export default App;
