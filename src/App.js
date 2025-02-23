import {useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import CartContext from './context/CartContext'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import './App.css'

const App = () => {
  const [cartList, addCartItem] = useState([]) // it stores the cart items
  const [restaurantName, setRestaurantName] = useState('') // restaurantName for header

  const removeAllCartItems = () => {
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
    const sameProduct = cartList.find(
      eachItem => eachItem.dishId === product.dishId,
    )

    if (sameProduct) {
      addCartItem(prevState => [
        ...prevState.map(eachItem => {
          if (sameProduct.dishId === eachItem.dishId) {
            const updatedQuantity = eachItem.quantity + product.quantity
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      ])
    } else {
      addCartItem(prevState => [...prevState, product])
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
        onClickAddtoCart,
        restaurantName,
        setRestaurantName,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
