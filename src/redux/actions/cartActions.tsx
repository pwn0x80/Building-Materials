import { addProductToCart, removeProductFromCart } from "@redux/userSlice"

export const addProductToCartAction = (product: any, dispatch: any) => {
  dispatch(addProductToCart({
    value: {
      pId: product?._id,
      name: product?.name,
      qty: product?.qty | 1,
      price: product?.price,
      imgUrls: product?.imageUrls[0]
    }
  }))
}
export const removeProductFromCartAction = (dispatch: any,productId: any) => {
  dispatch(removeProductFromCart({ value: productId }))
}

