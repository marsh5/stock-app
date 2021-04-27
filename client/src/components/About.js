import React from 'react'
import Nav from './Nav';
import DisplayModal from './DisplayModal';
import Logo2 from '../images/logo2.svg'
import { Button } from './Button'
import { HiChevronDoubleRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { modalDisplay } from '../reducers/modalReducer'

function About() {

    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    return (
        <>
        <Nav />

        <div className ="hero about-container">
            <div className = "left-column">
                <h2>About</h2>

                {auth ? <>
                <p>Finance Visualized is a free platform to analyze public companies through interactive financial visualization tools. 
                Simply search for a stock above or view your own customized portfolio below.
                <span className="account-link">
                    <br></br>
                     <Link id="account-link" to="/account">   View your stocks <HiChevronDoubleRight className="double-arrows"/></Link>
                </span>
                </p>
                
                
                </> 
                : <>
                <p>Finance Visualized is a free platform to analyze public companies through interactive financial visualization tools. 
                Simply search for a stock above to get started or create an account below to unlock additional features.</p>
                <Button onClick={() => dispatch(modalDisplay('register'))} buttonSize='btn--wide' buttonColor='light--blue'>Sign Up</Button>
                </>}
            </div>
            <div className="right-column2">
            <img src={Logo2} alt="Hero Logo" id="hero-logo-img2" />
            </div>
        </div>
       
        <DisplayModal />
        </>
    )
}

export default About
