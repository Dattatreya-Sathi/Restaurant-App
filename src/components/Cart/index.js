import {useContext} from 'react'
import {Link} from 'react-router-dom'
import AppContext from '../../context/AppContext'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'

const Cart = () => {
  const {cartList, emptyCartList} = useContext(AppContext)

  const onClickRemoveList = () => emptyCartList()

  const renderEmptyCartView = () => (
    <div className="cart-empty-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        className="cart-empty-img"
        alt="cart empty"
      />
      <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

      <Link className="link" to="/">
        <button type="button" className="shop-now-btn">
          Go to Home
        </button>
      </Link>
    </div>
  )

  const renderCartList = () => (
    <div className="cart-content-container">
      <h1 className="cart-heading">My Cart</h1>
      <button
        type="button"
        className="remove-list-button"
        onClick={onClickRemoveList}
      >
        Remove All
      </button>
      <ul className="cart-list">
        {cartList.map(eachCartItem => (
          <CartItem key={eachCartItem.dishId} cartItemDetails={eachCartItem} />
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <Header />
      <div className="cart-container">
        {cartList.length === 0 ? renderEmptyCartView() : renderCartList()}
      </div>
    </>
  )
}

export default Cart
