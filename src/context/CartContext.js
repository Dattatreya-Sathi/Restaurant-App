import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeAllCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeCartItem: () => {},
  onClickAddtoCart: () => {},
  restaurantName: '',
  setRestaurantName: () => {},
})

export default CartContext
