import React, { useState, useEffect } from 'react';
import portfolioServices from '../services/portfolioServices';
import { useDispatch, useSelector } from 'react-redux'
import Nav from './Nav'
import DisplayModal from './DisplayModal';
import { modalDisplay } from '../reducers/modalReducer'

function Portfolio() {

    const [isUser, setIsUser] = useState("")
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);

    async function getUserData(){
        try {
            const res = await portfolioServices.getPortfolio();

            if(res.user_name){

            }
            
        } catch (err) {
            console.error('res-err',err.message)
        }
    }

    useEffect(() => {
        getUserData();
    },[])


    return (
        <>
        <Nav />
            {auth ? <>
            <div className="portfolio-container">
            <h2>My Portfolio</h2>
            <div className="portfolio-data">

            <table>
                <thead>
                    <tr className="head">
                        <th>Company Name</th>
                        <th>Ticker</th>
                        <th>Industry</th>
                        <th>+-</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Apple</td>
                        <td>AAPL</td>
                        <td>Hardware</td>
                        <td>Remove</td>
                    </tr>
                    <tr>
                        <td>Google</td>
                        <td>GOOG</td>
                        <td>Tech</td>
                        <td>Remove</td>
                    </tr>

                </tbody>
            </table>

            </div> 
            </div>
            </>
            : <div className="portfolio-container2">
                <div>Please <span id="portfolio-login" onClick={() => dispatch(modalDisplay('login'))}>log in</span> to view your portfolio</div>
            </div>
            
            }
        <DisplayModal />
        </>
    )
}

export default Portfolio
