import {Option, none, some, isNone } from "fp/option";

import { Dispatch } from '@reduxjs/toolkit';
import { isLoginSet } from "@redux/userSlice";

 const isUserLogin = async (dispatch: Dispatch<any>): Promise<Option<Object>> => {
  return fetch("http://localhost:8000/v", {
    method: "GET",
    credentials: "include"
  }).then((response) => response.json())
    .then((data) => {
      if (data?.status?.includes("USER_FOUND")) {
        dispatch(isLoginSet({ value: true }));
        return some({ cart: data?.data?.cart });
      }
      if (data?.status?.includes("USER_NOT_FOUND")) {
        return none;

      }
      return none;
    })
    .catch(error => {
      console.error("Error fetching user login status:", error);
      return none;
    });
}

export default isUserLogin
