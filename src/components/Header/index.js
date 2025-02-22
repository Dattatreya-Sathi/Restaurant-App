import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {IoCartOutline} from 'react-icons/io5'
import {AiOutlineHome} from 'react-icons/ai'
import AppContext from '../../context/AppContext'
import './index.css'

const Header = () => {
  const {cartList, restaurantName} = useContext(AppContext)
  const totalQuantity = cartList.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="header-container">
      <nav className="nav-container">
        <h1 className="restaurent-heading">{restaurantName}</h1>
        <div className="my-orders-container">
          <Link className="link home-tab" to="/">
            <h2 className="my-orders-heading">Home</h2>
            <AiOutlineHome className="cart-icon" />
          </Link>
          <Link className="link cart-tab" to="/cart">
            <h2 className="my-orders-heading">My Orders</h2>
            <div className="cart-icon-container">
              <IoCartOutline className="cart-icon" />
              <div className="cart-count-container">
                <p className="cart-count">{totalQuantity}</p>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default withRouter(Header)
