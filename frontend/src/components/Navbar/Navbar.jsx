import React from 'react'
import "./navbar.scss"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

function Navbar() {
  return (
    <div className='navbar'>
        <div className="left">
          <Breadcrumb/>
        </div>
        <div className='right'>
            <AccountCircleIcon className='avatar'/>
        </div>
    </div>
  )
}

export default Navbar