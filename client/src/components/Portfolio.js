import React, { useState, useEffect } from 'react';
import portfolioServices from '../services/portfolioServices';
import { useDispatch, useSelector } from 'react-redux'
import Nav from './Nav'
import DisplayModal from './DisplayModal';
import { modalDisplay } from '../reducers/modalReducer'

function Portfolio() {

    const [data, setData] = useState([])
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);

    async function getUserData(){
        try {
            const res = await portfolioServices.getPortfolio();

            console.log('res!!!!',res)
            setData(res);
            
        } catch (err) {
            console.error('res-err',err.message)
        }
    }
    const DisplayData = () =>{
        if(data[0]){
            if(data[0].ticker !==null){
                return (
                <div>
                <table>
                    <thead>
                        <tr className="head">
                            <th>Company Name</th>
                            <th>Ticker</th>
                            <th>Industry</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(el => (
                           <tr key={`${el.name} ${el.user_name}`}>
                               <td>{el.name}</td>
                               <td>{el.ticker}</td>
                               <td>{el.sector}</td>
                               <td className="remove-link">remove</td>
                           </tr> 
                        )
                        )}
                    </tbody>
                </table>
                </div>)
            } else{
                return <div>You currently have no stocks in your portfolio. Search for a stock above and click "add" to begin creating your portfolio. </div>
            }
        }
        return <></>
    }
    

    useEffect(() => {
        getUserData();
    },[auth])


    return (
        <>
        <Nav />
            {auth ? <>
            <div className="portfolio-container">
            <h2>My Portfolio</h2>
            <div className="portfolio-data">
            <DisplayData />
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
