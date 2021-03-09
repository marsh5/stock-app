import React from 'react'
import { AiOutlineStock } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { IconContext } from 'react-icons';
import { Button } from './Button'
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import stockServices from '../services/stockServices';
import { foundStock } from '../reducers/stockReducer'



function Nav() {
    let history = useHistory();
    const dispatch = useDispatch();
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        const content = ev.target[0].value;
        ev.target[0].value = '';
        console.log(content)
        history.push(`/financials/${content}`)
        
        //to be refactored - Nav component should not be fetching data.
        const fetchData = async () => {
            const stockData = await stockServices.getStockData(content);
            dispatch(foundStock(stockData))
        }
        fetchData();

    }
    
    return (
        <IconContext.Provider value={{size: 38}} >
           
            <nav>
                <div className="nav-logo">
                    <AiOutlineStock />
                    Finance Visualized
                </div>
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
