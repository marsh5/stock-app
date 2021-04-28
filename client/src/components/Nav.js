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
        console.log('should be clicking')
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
                                <li onClick={() => {setShowMenu(!showMenu)}}><Link to="/"><AiOutlineHome className="menu-icons"/>Home</Link></li>
                                <li onClick={() => {setShowMenu(!showMenu)}}><Link to="/portfolio"><AiOutlineUnorderedList className="menu-icons"/>My Stocks</Link></li>
                                <li onClick={() => {setShowMenu(!showMenu)}}><Link to="/about"><AiOutlineInfoCircle className="menu-icons"/>About</Link></li>
                                <li onClick ={logOut}><AiOutlineLogout className="menu-icons" />Logout</li>
                                </>
                                :
                                <>
                                <li onClick={() => {setShowMenu(!showMenu)}}><Link to="/"><AiOutlineHome className="menu-icons"/>Home</Link></li>
                                <li onClick={() => {setShowMenu(!showMenu)}}><Link to="/about"><AiOutlineInfoCircle className="menu-icons"/>About</Link></li>
                                <li onClick={() => {
                                    // setShowMenu(!showMenu)
                                    handleModuleClick('login')
                                }}><AiOutlineLogin className="menu-icons"/>Log In</li>
                                <li onClick={() => {
                                    // setShowMenu(!showMenu)
                                    handleModuleClick('register')
                                }} ><BsPencilSquare className="menu-icons"/>Sign Up</li>
                                </>}
                                
                            </ul>
                        </div>
                    </div>
                </div>

            </>
    )
}

export default Nav
