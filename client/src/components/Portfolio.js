import React, { useState, useEffect } from 'react';
import portfolioServices from '../services/portfolioServices';
import { useDispatch, useSelector } from 'react-redux'
import Nav from './Nav'
import DisplayModal from './DisplayModal';
import { tickerChange } from '../reducers/searchReducer'
import { isLoading } from '../reducers/loadingReducer'
import { modalDisplay } from '../reducers/modalReducer'
import { useHistory } from "react-router-dom"
import { RiCloseCircleFill } from 'react-icons/ri'

function Portfolio() {

    let history = useHistory();

    const [data, setData] = useState([])
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);

    async function getUserData(){
        try {
            const res = await portfolioServices.getPortfolio();
            setData(res);
            
        } catch (err) {
            console.error('res-err',err.message)
        }
    }

    const formatTitle = (str) => {
        if(str.split(' ')[0] === "Alphabet") return 'Alphabet (Google)'
        let title = str.toLowerCase().split(' ')
       .map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
       return title;
       
    }

    const handleCoClick = (ticker) => {
        dispatch(tickerChange(ticker))
        dispatch(isLoading(true))
        history.push(`/financials/`);
    }

    const handleRemove = (ticker) => {
        portfolioServices.removeStock(ticker);
        const newArr = data.filter((el) => 
            el.ticker !== ticker
        )
        if(newArr.length === 0){
            newArr[0] = 1;
        }
        setData(newArr)
    }

    const DisplayData = ({ info }) =>{
        if(info[0]){
            if(info[0].ticker){
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
                        {info.map(el => (
                           <tr key={`${el.name} ${el.user_name}`}>
                               <td onClick={() => {handleCoClick(el.ticker)}}><span className="td-click">{formatTitle(el.name)}</span></td>
                               <td onClick={() => {handleCoClick(el.ticker)}}><span className="td-click">{el.ticker}</span></td>
                               <td>{el.sector}</td>
                               <td onClick={() => {handleRemove(el.ticker)}} className="remove-link"><span className="remove-link-x"><RiCloseCircleFill /></span><span className="remove-link-text">Unfollow</span> </td>
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
            <DisplayData info={data} />
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
