import {useContext} from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import AppContext from '../../context/AppContext'
import './index.css'

const CartItem = props => {
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(AppContext)

  const {cartItemDetails} = props
  const {
    dishId,
    dishImage,
    dishName,
    dishDescription,
    dishPrice,
    quantity,
  } = cartItemDetails

  const onDecrementQuantity = () => {
    decrementCartItemQuantity(dishId)
  }

  const onIncrementQuantity = () => {
    incrementCartItemQuantity(dishId)
  }

  const onRemoveCartItem = () => {
    removeCartItem(dishId)
  }

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={dishImage} alt={dishName} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{dishName}</p>
          <p className="cart-product-brand">by {dishDescription}</p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            data-testid="minus"
            onClick={onDecrementQuantity}
          >
            -
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            data-testid="plus"
            onClick={onIncrementQuantity}
          >
            +
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">SAR {dishPrice * quantity}</p>
          <button
            className="remove-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        data-testid="remove"
        onClick={onRemoveCartItem}
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}

export default CartItem
