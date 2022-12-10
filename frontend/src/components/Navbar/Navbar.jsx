import React from 'react'
import "./navbar.scss"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

function Navbar({projects, grouppages, baiposts}) {
  return (
    <div className='navbar'>
        <div className="left">
          <Breadcrumb projects={projects} grouppages={grouppages} baiposts={baiposts}/>
        </div>
        <div className='right'>
            <AccountCircleIcon className='avatar' sx={{marginRight: "20px", transform:"scale(1)"}}/>
        </div>
    </div>
  )
}

export default Navbar