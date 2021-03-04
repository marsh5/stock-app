import React from 'react'
import { AiOutlineStock } from 'react-icons/ai'
import { IconContext } from 'react-icons';

function Nav() {
    return (
        <IconContext.Provider value={{size: 32}} >
            <nav>
                <div className="nav-logo">
                    <AiOutlineStock />
                    Finance Visualized
                </div>
                <div className="nav-links">
                    <div>Login</div>
                    <div>Sign Up</div>
                </div>
            </nav>
        </IconContext.Provider>
    )
}

export default Nav
