import {useContext} from 'react'
import AppContext from '../../context/AppContext'
import './index.css'

const ItemsList = props => {
  const {eachItem, onAddCart} = props
  const {
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    addonCat,
    dishImage,
    dishName,
    dishPrice,
    dishType,
    dishId,
  } = eachItem

  const {onClickAddtoCart, cartList, decrementCartItemQuantity} = useContext(
    AppContext,
  )

  const cartItem = cartList.find(item => item.dishId === dishId)
  const quantityNum = cartItem ? cartItem.quantity : 0 // Default to 0 if not in cart

  const onIncreaseQty = () => {
    onClickAddtoCart(eachItem)
  }

  const onDecreaseQty = () => {
    decrementCartItemQuantity(dishId)
    onAddCart(prevCart => (prevCart > 0 ? prevCart - 1 : 0))
  }

  return (
    <li className="dish-item-container">
      <div className="item-left-container">
        <div className={`veg-box ${dishType === 1 && 'non-veg-box'}`}>
          <div className={`veg-dot ${dishType === 1 && 'non-veg-dot'}`} />
        </div>
        <div className="item-details-container">
          <h1 className="dish-name">{dishName}</h1>
          <h2 className="sar-value">
            {dishCurrency} {dishPrice}
          </h2>
          <p className="dish-description">{dishDescription}</p>
          {dishAvailability ? (
            <div className="buttons-container">
              <div className="button-bg-container">
                <button
                  type="button"
                  className="quantity-button"
                  onClick={onDecreaseQty}
                >
                  -
                </button>
                <p className="quantity">{quantityNum}</p>
                <button
                  type="button"
                  className="quantity-button"
                  onClick={onIncreaseQty}
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <p className="not-available"> Not available</p>
          )}
          {addonCat.length > 0 && (
            <p className="customizations">Customizations available</p>
          )}
        </div>
      </div>
      <div className="item-right-container">
        <p className="calories">{dishCalories} calories</p>
        <img className="dish-image" src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}

export default ItemsList
