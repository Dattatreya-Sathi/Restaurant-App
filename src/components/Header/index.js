import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoCartOutline} from 'react-icons/io5'
import {AiOutlineHome} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {cartList, restaurantName} = useContext(CartContext)

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <header className="header-container">
      <nav className="nav-container">
        <Link to="/" className="link">
          <h1 className="restaurent-heading">{restaurantName}</h1>
        </Link>
        <div className="my-orders-container">
          <Link className="link home-tab" to="/">
            <h2 className="my-orders-heading">Home</h2>
            <AiOutlineHome className="cart-icon" />
          </Link>
          <Link className="link cart-tab" to="/cart">
            <h2 className="my-orders-heading">My Orders</h2>
            <div className="cart-icon-container">
              <button
                type="button"
                data-testid="cart"
                className="cart-icon-btn"
              >
                <IoCartOutline className="cart-icon" />
              </button>
              <div className="cart-count-container">
                <p className="cart-count">{cartList.length}</p>
              </div>
            </div>
          </Link>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  )
}

export default withRouter(Header)
