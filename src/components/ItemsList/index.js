import {useContext, useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const ItemsList = props => {
  const {eachItem} = props
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
  } = eachItem

  const [quantity, setQuantity] = useState(0)

  const {onClickAddtoCart} = useContext(CartContext)

  const onIncreaseQty = () => {
    setQuantity(prevState => prevState + 1)
  }

  const onDecreaseQty = () => {
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))
  }

  const onClickAddtoCartBtn = () => {
    onClickAddtoCart({...eachItem, quantity})
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
                <p className="quantity">{quantity}</p>
                <button
                  type="button"
                  className="quantity-button"
                  onClick={onIncreaseQty}
                >
                  +
                </button>
              </div>
              {quantity > 0 && (
                <button
                  type="button"
                  className="AddtoCartBtn"
                  onClick={onClickAddtoCartBtn}
                >
                  ADD TO CART
                </button>
              )}
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
