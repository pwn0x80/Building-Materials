import { createSlice } from "@reduxjs/toolkit"

export type IUserStore = {
  isUserLogin: boolean;
  cart: {
    [key: string]: any;
  };
}
const initialState: IUserStore = {
  isUserLogin: false,
  cart: {}
}


const UserSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    isLoginSet: (state, action) => {
      state.isUserLogin = action.payload.value;
    },
    setCart: (state, action) => {
      state.cart = action.payload.value;
    },
    addProductToCart: (state, action) => {
      state.cart.products = [
        ...state.cart.products,
        action.payload.value
      ]
    },
    removeProductFromCart: (state, action) => {
      state.cart.filter((product: any) => {
        if (product.pId == action.payload.value.productId) {
          return false;
        }
        return true;
      })
    }
  },
})
export default UserSlice.reducer;
export const { isLoginSet, setCart, addProductToCart,removeProductFromCart } = UserSlice.actions;

