import './index.css'

const TabMenuItems = props => {
  const {category, onSelectTab, isActive} = props
  const {menuCategory, menuCategoryId} = category

  const onClickTab = () => {
    onSelectTab(menuCategoryId)
  }

  return (
    <li className={`category-item ${isActive && 'activeTabStyle'}`}>
      <button
        type="button"
        className={`category-button ${isActive && 'activeTabColor'}`}
        onClick={onClickTab}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default TabMenuItems
