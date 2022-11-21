import React from 'react'
import "./login.scss"
import "../../utilites/widget.scss"
import { Link } from "react-router-dom"
import "../../utilites/divider.scss"

function checkValid(data) {
  console.log({ data })
}

function Login() {
  return (
    <div className="auth-page login">
      <div className='auth-container widget'>
        <div className="top login"><span className="title">LOGIN</span></div>
        {/* <span className="divider"><hr /></span> */}
        <div className="center">
          <form onSubmit={checkValid} className="login-form">
            <div className="email-container">
              <div className="email-label">
                <label for="email">Email</label>
              </div>
              <div className="email-input">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

            </div>

            <div className="password-container">
              <div className="password-label">
                <label for="password">Password</label>
              </div>
              <div className="password-input">
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

            </div>

            <div className="submit-container">
              <button type="submit" className='submit button'><Link to='/projects'>Login</Link></button>
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