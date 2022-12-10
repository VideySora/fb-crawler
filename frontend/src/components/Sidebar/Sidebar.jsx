import React from 'react'
import "./sidebar.scss"
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CookieIcon from '@mui/icons-material/Cookie';
import ArticleIcon from '@mui/icons-material/Article';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from "react-router-dom";
import { Avatar } from '@mui/material';
import LogoBK from "../../utilites/BKLogos.png";
import "../../utilites/page.scss"

function Sidebar({setUser, setToken, setProjects, setGrouppages, setBaiposts}) {
    const navigate = useNavigate();
    function handleLogout(e){
        e.preventDefault();
        setUser(null);
        setToken(null);
        setProjects([]);
        setGrouppages([]);
        setBaiposts([]);
        window.localStorage.clear();
        navigate('/login');
    }
    return (
        <div className="sidebar">
            <div className="top">
                <Avatar alt="Logo BK" src={LogoBK} className="logo"></Avatar>
                <span className="top-title">Facebook Post</span>
            </div>

            <span className="divider"><hr /></span>

            <div className="center">
                <ul>
                    <li>
                        <AccountTreeIcon className='icon'/>
                        <span className='title'>Projects</span></li>
                    <li>
                        <ArticleIcon className='icon'/>
                        <span className='title'>Document</span></li>
                    <li>
                        <KeyboardReturnIcon className='icon'/>
                        <span className='title' onClick={(e) => handleLogout(e)}>Log out</span></li>
                </ul>
            </div>

            <div className="bottom"></div>
        </div>
    )
}

export default Sidebar