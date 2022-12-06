import React from 'react'
import "./login.scss"
import "../../utilites/widget.scss"
import { Link, useNavigate } from "react-router-dom"
import "../../utilites/divider.scss"



function Login({setToken, errorMessage, setErrorMessage, username, setUsername, password, setPassword, user, setUser, loginService}) {
  const navigate = useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const returnUser = await loginService({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(returnUser)
      ) 
      setToken(returnUser.token)
      setUser(returnUser)
      setUsername('')
      setPassword('')
      setErrorMessage(null)
      navigate('/')
    } catch (exception) {
      setErrorMessage('Wrong username or password!')
      
    }
  }
  return (
    <div className="auth-page login">
      <div className='auth-container widget'>
        <div className="top login"><span className="title">LOGIN</span></div>
        {/* <span className="divider"><hr /></span> */}
        <div className="center">
          <form onSubmit={handleLogin} className="login-form">
            <div className="email-container">
              <div className="email-label">
                <label>Username</label>
              </div>
              <div className="email-input">
                <input
                  type="text"
                  value={username}
                  name="Username"
                  placeholder="Enter your username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>

            </div>

            <div className="password-container">
              <div className="password-label">
                <label>Password</label>
              </div>
              <div className="password-input">
                <input
                  type="password"
                  value={password}
                  name="Password"
                  placeholder="Enter your password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>

            </div>
            <div className="email-container">
              <div className="email-label">
                {errorMessage}
              </div>
            </div>
           
            <div className="submit-container">
              <button type="submit" className='submit button'>Login</button>
            </div>
          </form>
        </div>

        <div className="bottom">
          <span className="title"> Haven't signed up? </span>
          <Link to="/signup" className='signUp'>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login