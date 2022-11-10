import React from 'react'
import "./login.scss"
import "../../utilites/widget.scss"
import { Link, Navigate } from "react-router-dom"
import "../../utilites/divider.scss"

function createUser(data) {
    console.log({ data })
  }

function Signup() {
  return (
    <div className="auth-page">
      <div className='auth-container widget signup'>
        <div className="top signup"><span className="title">SIGN UP</span></div>
        {/* <span className="divider"><hr /></span> */}
        <div className="center">
          <form onSubmit={createUser} className="signup-form">
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

            <div className="password-container">
              <div className="password-label">
                <label for="password">Validation</label>
              </div>
              <div className="password-input">
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  required
                />
              </div>

            </div>

            <div className="submit-container">
              <button type="submit" className='submit button'>Sign Up</button>
            </div>
          </form>
        </div>

        <div className="bottom">
            <Link to="/login" className='logIn'>Return to Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup