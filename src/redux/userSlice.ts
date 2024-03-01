import { createSlice } from "@reduxjs/toolkit"

export type IUserStore = {
  isUserLogin: boolean;
  role:string;
  cart: {
    [key: string]: any;
  };
}
const initialState: IUserStore = {
  isUserLogin: false,
  role: "PENDING",
  cart: {}
}


const UserSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    isLoginSet: (state, action) => {
      state.isUserLogin = action.payload.value;
    },
    setUserRole: (state,action)=>{
      state.role = action.payload.value;
    }
    ,
    setCart: (state, action) => {
      state.cart = action.payload.value;
    },
    addProductToCart: (state, action) => {
      state.cart.products = [
        ...state.cart.products,
        action.payload.value
      ]
    },
    setCartEmpty: (state, action) => {
      state.cart.status = "pendng";
      state.cart.products = [];
    },
    removeProductFromCart: (state, action) => {
      state.cart.products = state.cart.products.filter((product: any) => {
        if (product.pId == action.payload.value.productId) {
          return false;
        }
        return true;
      })
    }
  },
})
export default UserSlice.reducer;
export const {setUserRole, isLoginSet, setCart, addProductToCart, removeProductFromCart, setCartEmpty } = UserSlice.actions;

