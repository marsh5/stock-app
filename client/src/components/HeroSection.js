import React from 'react'
import Logo1 from '../images/logo1.svg'
import { Button } from './Button'
import { HiChevronDoubleRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { modalDisplay } from '../reducers/modalReducer'

function HeroSection() {

    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    return (
        <div className ="hero">
            <div className = "left-column">
                <h1>Stock Analysis & Data Visualization</h1>

                {auth ? <>
                <p>Search for your favorite stocks and analyze the latest financial data. 
                <span className="account-link">
                    <br></br>
                     <Link id="account-link" to="/account">   View your stocks <HiChevronDoubleRight className="double-arrows"/></Link>
                </span>
                </p>
                
                
                </> 
                : <>
                <p>Search for your favorite stocks and analyze the latest financial data. Sign up below.</p>
                <Button onClick={() => dispatch(modalDisplay('register'))} buttonSize='btn--wide' buttonColor='light--blue'>Sign Up</Button>
                </>}
            </div>
            <div className="right-column">
            <img src={Logo1} alt="Hero Logo" id="hero-logo-img" />
            </div>
        </div>
    )
}

export default HeroSection
