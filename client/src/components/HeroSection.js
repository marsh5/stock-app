import React from 'react'
import Logo1 from '../images/logo1.svg'
import { Button } from './Button'

function HeroSection() {
    return (
        <div className ="hero">
            <div className = "left-column">
                <h1>Stock Analysis & Data Visualization</h1>
                <p>Search for your favorite stocks and analyze the latest financial data. Sign up below.</p>
                <Button buttonSize='btn--wide' buttonColor='light--blue'>Sign Up</Button>
            </div>
            <div className="right-column">
            <img src={Logo1} alt="Hero Logo" id="hero-logo-img" />
            </div>
        </div>
    )
}

export default HeroSection
