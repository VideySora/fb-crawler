import React from 'react'
import "./sidebar.scss"
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CookieIcon from '@mui/icons-material/Cookie';
import ArticleIcon from '@mui/icons-material/Article';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="top"><span className="logo">Facebook Post</span></div>

            <span className="divider"><hr /></span>

            <div className="center">
                <ul>
                    <li>
                        <AccountTreeIcon className='icon'/>
                        <span className='title'>Projects</span></li>
                    <li>
                        <CookieIcon className='icon'/>
                        <span className='title'>Cookie Check</span></li>
                    <li>
                        <ArticleIcon className='icon'/>
                        <span className='title'>Document</span></li>
                    <li>
                        <KeyboardReturnIcon className='icon'/>
                        <span className='title'>Log out</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar