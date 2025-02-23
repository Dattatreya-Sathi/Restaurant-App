import {useState} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  const getUserDetails = async () => {
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      loginSuccess(data.jwt_token)
      setErrorMsg('')
    } else {
      setErrorMsg(
        data.status_code === 404 ? 'Username is not found' : data.error_msg,
      )
      setUserName('')
      setPassword('')
    }
  }

  const onSubmitCredentials = async event => {
    event.preventDefault()
    if (username.trim() === '' || password.trim() === '') {
      setErrorMsg('Username or password is invalid')
      return
    }

    getUserDetails()
  }

  const onEnterUserName = event => {
    setErrorMsg('')
    setUserName(event.target.value)
  }

  const onEnterPassword = event => {
    setErrorMsg('')
    setPassword(event.target.value)
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-bg-container">
      <div className="login-app-tag-container">
        <h1 className="login-heading">Are you starving?</h1>
        <p className="login-description">Login and order with ease!</p>
      </div>
      <div className="login-left-container">
        <form className="form-container" onSubmit={onSubmitCredentials}>
          <label className="login-label" htmlFor="userName">
            USERNAME
          </label>
          <input
            type="text"
            id="userName"
            name="username"
            onChange={onEnterUserName}
            value={username}
          />
          <label className="login-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onEnterPassword}
            value={password}
          />
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <div className="login-btn-container">
            <button className="login-btn" type="submit">
              Login
            </button>
          </div>
        </form>
        <img
          className="plate-image"
          src="https://res.cloudinary.com/dsaybpgsu/image/upload/v1740314595/5f8ad2f4c7f31fbf2b60eb4427f4e38d-removebg-preview_2_odzkgq.png"
          alt="food"
        />
      </div>
    </div>
  )
}

export default Login
