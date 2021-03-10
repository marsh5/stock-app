import React from 'react'
import { AiOutlineStock } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { IconContext } from 'react-icons';
import { Button } from './Button'
import { useHistory } from "react-router-dom"


function Nav() {
    let history = useHistory();
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        const content = ev.target[0].value;
        ev.target[0].value = '';
        history.push(`/financials/${content}`);

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
