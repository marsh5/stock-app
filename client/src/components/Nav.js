import React from 'react'
import { AiOutlineStock } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { IconContext } from 'react-icons';
import { Button } from './Button'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { foundStock } from '../reducers/stockReducer'
import { tickerChange } from '../reducers/searchReducer'
import stockServices from '../services/stockServices';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


function Nav() {
    let history = useHistory();
    const dispatch = useDispatch();
    const currentTicker = useSelector(state => state.search);
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        const ticker = ev.target[0].value;
        ev.target[0].value = '';
        if(ticker !== currentTicker && ticker !==''){
            dispatch(tickerChange(ticker))
        }
        let url = history.location.pathname;
        if(url.substring(1, url.length - 1) !== 'financials'){
            history.push(`/financials/`);
        }
        
        

    }
    
    return (
        <IconContext.Provider value={{size: 38}} >
           
            <nav>
                <Link to="/">
                <div className="nav-logo">
                    <AiOutlineStock />
                    Finance Visualized
                </div>
                </Link>

                <div className="search-bar">
                    <form onSubmit={onSubmit}>
                    <input placeholder="Search company" />
                    <button type="submit" ><FiSearch /></button>
                    </form>
                    
                </div>
                <div className="nav-links">
                    <Button buttonStyle='btn--outline' buttonSize='btn--small'>Log In</Button>
                    <Button buttonSize='btn--small' buttonColor='light--blue'>Sign Up</Button>
                    
                </div>
            </nav>

        </IconContext.Provider>
    )
}

export default Nav
