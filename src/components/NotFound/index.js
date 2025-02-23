import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">Page Not Found</h1>
    <Link to="/">
      <button type="button" className="not-found-btn">
        Go Home
      </button>
    </Link>
  </div>
)

export default NotFound
