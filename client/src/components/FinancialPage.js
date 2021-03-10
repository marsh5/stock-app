import React, {useEffect} from 'react'
import { useLocation, useHistory} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { foundStock } from '../reducers/stockReducer'
import { tickerChange } from '../reducers/searchReducer'
import stockServices from '../services/stockServices';
import { Line } from 'react-chartjs-2';
import Nav from './Nav'

function FinancialPage() {
    const dispatch = useDispatch();

    let history = useHistory();
    useLocation();
    let ticker = history.location.pathname.split('/')[2];
    let ticker2 = useSelector(state => state.search);

    if(ticker !== ticker2){
        dispatch(tickerChange(ticker))
        //forces a rerender
    }
    console.log('state:', useSelector(state=> state));
    useEffect(() => {
        if (stock.length === 0){
            const fetchData = async () => {
                const stockData = await stockServices.getStockData(ticker);
                if(stockData.length !== 0){
                    dispatch(foundStock(stockData))
                }
                
            }
            fetchData();
        }
    },)
    const stock = useSelector(state => state.stock);

    const formatTitle = (str) => {
        if(str.split(' ')[0] === "Alphabet") return 'Alphabet (Google)'
        let title = str.toLowerCase().split(' ')
       .map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
       return title;
       
    }

    const data = {
        labels: stock.map(el => el['Fiscal Year']),
        datasets: [
          {
            label: 'Revenue',
            data: stock.map(el => el['Revenue']),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      }
      
      const options = {
          tooltips: {
              callbacks: {
                  label: function(tooltipItem, data) {
                    return `$${Math.round(tooltipItem.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  }
              }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function(value, index, values) {
                    return `$${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                }
              },
            },
          ],
        },
      }

   
 
    return (
        <>
            <Nav/>
            <div className="financial-page">
                {stock.length !== 0 ? 
                <>
                <h2>{formatTitle(stock[0].name)}</h2>
                <div className = "graph-container">
                    <Line data={data} options = {options} />
                </div>
                
                <h3>Revenue:</h3>
                <ul>
                    {stock.map((el, i) => 
                        <li key={el['SimFinId'] + i}>{el['Fiscal Year']} {el['Revenue']}</li>)} 
                </ul>
                </> :
                <p>Company Not Found. Please search for another Company</p>}
                <p>ticker = {ticker}</p>
            </div>

        </>
    )
}

export default FinancialPage
