import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import AppContext from './context/AppContext'
import Home from './components/Home'
import Cart from './components/Cart'
import './App.css'

const App = () => {
  const [cartList, addCartItem] = useState([]) // it stores the cart items
  const [restaurantName, setRestaurantName] = useState('') // restaurantName for header

  const emptyCartList = () => {
    addCartItem([]) // if the user clicks on Remove all button the entire cartList will delete
  }
  const removeCartItem = dishId => {
    // it will delete a specific cart item in the cartList
    const updatedData = cartList.filter(eachItem => eachItem.dishId !== dishId)
    addCartItem(updatedData)
  }

  const incrementCartItemQuantity = dishId => {
    /* when the user cliks on + button in cart list quantity will increase and 
    it's also update the quantity count in both home and cart list routes */
    addCartItem(prevState =>
      prevState.map(eachItem => {
        if (eachItem.dishId === dishId) {
          const increaseQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: increaseQuantity}
        }
        return eachItem
      }),
    )
  }

  const decrementCartItemQuantity = dishId => {
    /* when the user cliks on + button in cart list quantity will decrease and 
    it's also update the quantity count in both home and cart list routes. 
    If quantity less than 1 the dish will remove from the cartList */
    addCartItem(
      prevState =>
        prevState
          .map(eachItem => {
            if (eachItem.dishId === dishId) {
              if (eachItem.quantity > 1) {
                return {...eachItem, quantity: eachItem.quantity - 1}
              }
              return null // Mark for removal
            }
            return eachItem
          })
          .filter(item => item !== null), // Remove items marked for deletion
    )
  }

  const onClickAddtoCart = product => {
    addCartItem(prevCart => {
      const existingItem = prevCart.find(
        eachItem => eachItem.dishId === product.dishId,
      )

      if (existingItem) {
        return prevCart.map(eachItem =>
          eachItem.dishId === product.dishId
            ? {...eachItem, quantity: eachItem.quantity + 1} // If the dish exists in cartList, it will Increase quantity
            : eachItem,
        )
      }
      return [...prevCart, {...product, quantity: 1}] // If the dish not exists in cartList, it will Add new item with quantity 1
    })
  }

  return (
    <AppContext.Provider
      value={{
        cartList,
        addCartItem,
        emptyCartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
        onClickAddtoCart,
        restaurantName,
        setRestaurantName,
      }}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </AppContext.Provider>
  )
}

export default App
