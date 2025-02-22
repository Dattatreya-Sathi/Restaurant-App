import {useState, useEffect, useContext, useCallback} from 'react'
import Loader from 'react-loader-spinner'
import AppContext from '../../context/AppContext'
import Header from '../Header'
import TabMenuItems from '../TabMenuItems'
import ItemsList from '../ItemsList'
import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [menuDetailsList, setMenuDetailsList] = useState([])
  const [selectedTab, isSelected] = useState('')
  const [cartItems, onAddCart] = useState(0)
  const [error, setError] = useState(false) // State for error
  const {setRestaurantName} = useContext(AppContext)

  const getMenuDetails = useCallback(async () => {
    setIsLoading(true)
    setError(false) // Reset error before fetching
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    /* if api call success data will add to menuDetailsList with the camelCase naming convention
     else throw an error popup */
    try {
      if (response.ok) {
        setRestaurantName(data[0].restaurant_name)
        const updatedData = data[0].table_menu_list.map(menuObj => ({
          categoryDishes: menuObj.category_dishes.map(dishObj => ({
            dishAvailability: dishObj.dish_Availability,
            dishType: dishObj.dish_Type,
            dishCalories: dishObj.dish_calories,
            dishCurrency: dishObj.dish_currency,
            dishDescription: dishObj.dish_description,
            dishId: dishObj.dish_id,
            dishImage: dishObj.dish_image,
            dishName: dishObj.dish_name,
            dishPrice: dishObj.dish_price,
            nextUrl: dishObj.nexturl,
            addonCat: dishObj.addonCat.map(eachAddon => ({
              addonCategory: eachAddon.addon_category,
              addonCategoryId: eachAddon.addon_category_id,
              addonSelection: eachAddon.addon_selection,
              addons: eachAddon.addons,
              nextUrl: eachAddon.nexturl,
            })),
          })),
          menuCategory: menuObj.menu_category,
          menuCategoryId: menuObj.menu_category_id,
          menuCategoryImage: menuObj.menu_category_image,
          nextUrl: menuObj.nextUrl,
        }))
        // console.log(updatedData)
        setIsLoading(false)
        setMenuDetailsList(updatedData)
        isSelected(updatedData[0].menuCategoryId)
      }
    } catch (e) {
      setIsLoading(false)
      setError(true) // Show popup on error
    }
  }, [setRestaurantName])

  useEffect(() => {
    getMenuDetails()
  }, [getMenuDetails])

  useEffect(() => {
    console.log('Cart Items Updated:', cartItems)
  }, [cartItems])

  const renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#f5945c" height={50} width={50} />
    </div>
  )

  const renderErrorPopup = () => (
    <div className="error-popup">
      <p>Failed to load data. Please try again.</p>
      <button type="button" className="retry-button" onClick={getMenuDetails}>
        Retry
      </button>
    </div>
  )

  const onSelectTab = id => {
    isSelected(id)
  }

  const renderHomeView = () => {
    const itemsList = menuDetailsList.find(
      eachCategory => eachCategory.menuCategoryId === selectedTab,
    )
    // console.log(itemsList)
    return (
      <div className="home-container">
        <Header />
        <ul className="tab-menu-ul-container">
          {menuDetailsList.map(eachObj => (
            <TabMenuItems
              category={eachObj}
              key={eachObj.menuCategoryId}
              isActive={eachObj.menuCategoryId === selectedTab}
              onSelectTab={onSelectTab}
            /> // we can switch between dish category
          ))}
        </ul>
        <div className="dishes-list-parent-container">
          {itemsList !== undefined && (
            <ul className="dish-ul-item">
              {itemsList.categoryDishes.map(eachItem => (
                <ItemsList
                  eachItem={eachItem}
                  key={eachItem.dishId}
                  onAddCart={onAddCart}
                  cartItems={cartItems}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  if (isLoading) {
    return renderLoaderView()
  }
  if (error) {
    return renderErrorPopup()
  }
  return renderHomeView()
}

export default Home
