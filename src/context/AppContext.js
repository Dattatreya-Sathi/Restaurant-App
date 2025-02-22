import React from 'react'

const AppContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  emptyCartList: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeCartItem: () => {},
  onClickAddtoCart: () => {},
  restaurantName: '',
  setRestaurantName: () => {},
})

export default AppContext
