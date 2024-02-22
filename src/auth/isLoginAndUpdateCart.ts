import { Dispatch } from '@reduxjs/toolkit';
import { updateCart } from 'cart/cart';
import { isNone } from 'fp/option';
import isUserLogin  from './isUserLogin';
const isUserLoginAndUpdateCart = async (dispatch: Dispatch<any>) => {
  const isUserLoginOption = await isUserLogin(dispatch)
  if (isNone(isUserLoginOption)) {
    return false;
  } else {
    updateCart(dispatch, isUserLoginOption?.value);
    return true;
  }
}
export default isUserLoginAndUpdateCart
