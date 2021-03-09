import React, {useEffect} from 'react'
import { useParams} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { foundStock } from '../reducers/stockReducer'
import stockServices from '../services/stockServices';
import { Line } from 'react-chartjs-2';
import Nav from './Nav'

function FinancialPage() {
    let {ticker} =  useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (stock.length === 0){
            console.log('BAD BOY BEING CALLED')
            const fetchData = async () => {
                const stockData = await stockServices.getStockData(ticker);
                dispatch(foundStock(stockData))
            }
            fetchData();
        }
    }, [dispatch])
    const stock = useSelector(state => state.stock);
    console.log(stock)
    console.log(!stock)

    const formatTitle = (str) => {
        if(str.split('')[0] === "ALPHABET") return 'Alphabet (Google)'
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
            </div>

        </>
    )
}

export default FinancialPage
