import { createSlice } from "@reduxjs/toolkit"

const initialState: { isUserLogin: boolean, cart: object } = {
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
    }
  },
})
export default UserSlice.reducer;
export const { isLoginSet,setCart } = UserSlice.actions;

