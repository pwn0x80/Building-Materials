import { setCart } from "@redux/userSlice";

export const fetchAndUpdateCart = async (dispatch: any) => {
  try {

    const cart = await fetch("http://localhost/cart", {
      method: "GET",
      credentials: "include"
    }).then(res => res.json());
    if (cart?.status?.includes("USER_NOT_FOUND")) {
    }
    if (cart?.status?.includes("UPDATE_CART")) {
      dispatch(setCart({ value: cart?.data?.cart }))
    }
  } catch (err) {
    console.log(err);
  }
}




export const updateCart = (dispatch: any, cart: any) => {
  dispatch(setCart({ value: cart.cart }));
}

