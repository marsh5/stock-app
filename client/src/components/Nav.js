import React, { useState } from 'react'
import { AiOutlineStock } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
import {AiOutlineHome, AiOutlineInfoCircle, AiOutlineLogin, AiOutlineLogout, AiOutlineUnorderedList} from 'react-icons/ai'
import {BsPencilSquare} from 'react-icons/bs'
import { Button } from './Button'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { tickerChange } from '../reducers/searchReducer'
import { isLoading } from '../reducers/loadingReducer'
import { modalDisplay } from '../reducers/modalReducer'
import { isAuthenticated } from '../reducers/authReducer'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";


function Nav() {
    const [showMenu, setShowMenu] = useState(false)

    let history = useHistory();
    const dispatch = useDispatch();
    const currentTicker = useSelector(state => state.search);
    const auth = useSelector(state => state.auth);
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        setShowMenu(false)
        const ticker = ev.target[0].value;
        ev.target[0].value = '';
        if(ticker !== currentTicker && ticker !==''){
            dispatch(tickerChange(ticker))
            dispatch(isLoading(true))
        }
        let url = history.location.pathname;
        if(url.substring(1, url.length - 1) !== 'financials'){
            history.push(`/financials/`);
        }        

    }

    const handleModuleClick = (module) => {
        dispatch(modalDisplay(module))
    }

    const logOut = () => {
        localStorage.removeItem("token")
        dispatch(isAuthenticated(false));
        toast.success("Logged out succesfully!")
        setShowMenu(false)
    }
    
    return (
        <>
            <nav>
                <Link to="/">
                <div className="nav-logo">
                    <span id="logo"><AiOutlineStock /></span>
                    <span className="logo-text">Finance Visualized</span>
                </div>
                </Link>

                <div className="search-bar">
                    <form onSubmit={onSubmit}>
                    <input placeholder="Search company" />
                    <button type="submit" ><FiSearch /></button>
                    </form>
                    
                </div>
                <div className="nav-links">
                    {auth ?  
                    <div className="account" onClick={() => {setShowMenu(!showMenu)}}>
                        <FaUserCircle />
                    </div> : <>
                        <Button onClick={() => handleModuleClick('login')} buttonStyle='btn--outline' buttonSize='btn--small'>Log In</Button>
                        <Button onClick={() => handleModuleClick('register')} buttonSize='btn--small' buttonColor='light--blue'>Sign Up</Button>  
                        <div className={showMenu ? "bars menu-on" : "bars"} onClick={() => {setShowMenu(!showMenu)}}><div></div></div></>}
                   
                        
                    
                    
                </div>
                
            </nav>

            <div className = {showMenu ? "nav-menu menu-on" : "nav-menu"}>
                    <div>
                        <div>
                            <ul>
                                {auth ? 
                                <>
                                <li><AiOutlineHome className="menu-icons"/>Home</li>
                                <li><AiOutlineUnorderedList className="menu-icons"/>My Stocks</li>
                                <li><AiOutlineInfoCircle className="menu-icons"/>About</li>
                                <li onClick ={logOut}><AiOutlineLogout className="menu-icons" />Logout</li>
                                </>
                                :
                                <>
                                <li><AiOutlineHome className="menu-icons"/>Home</li>
                                <li><AiOutlineInfoCircle className="menu-icons"/>About</li>
                                <li><AiOutlineLogin className="menu-icons"/>Log In</li>
                                <li><BsPencilSquare className="menu-icons"/>Sign Up</li>
                                </>}
                                
                            </ul>
                        </div>
                    </div>
                </div>

            </>
    )
}

export default Nav
