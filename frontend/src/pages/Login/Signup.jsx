import React from 'react'
import "./login.scss"
import "../../utilites/widget.scss"
import { Link, useNavigate } from "react-router-dom"
import "../../utilites/divider.scss"


function Signup({username, setUsername, password, setPassword, signupService, errorMessage, setErrorMessage}) {
  const navigate = useNavigate();
  const handleSignup = async(event) => {
    event.preventDefault();
    try {
      const returnUser = await signupService({
        username, password,
      })
      setUsername('')
      setPassword('')
      setErrorMessage(null)
      navigate('/login')
    } catch (exception) {
      setErrorMessage('Username exist!!')
      
    }
  }
  return (
    <div className="auth-page">
      <div className='auth-container widget signup'>
        <div className="top signup"><span className="title">SIGN UP</span></div>
        {/* <span className="divider"><hr /></span> */}
        <div className="center">
          <form onSubmit={handleSignup} className="signup-form">
            <div className="email-container">
              <div className="email-label">
                <label>Username</label>
              </div>
              <div className="email-input">
                <input
                  type="text"
                  value={username}
                  placeholder="Enter your username"
                  onChange={({ target }) => setUsername(target.value)}
                  required
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
                  placeholder="Enter your password"
                  onChange={({ target }) => setPassword(target.value)}
                  required
                />
              </div>

            </div>
            <div className="email-container">
              <div className="email-label">
                {errorMessage}
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