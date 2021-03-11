import React, {useState, useEffect} from 'react'
import { useLocation, useHistory} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { foundStock } from '../reducers/stockReducer'
import { tickerChange } from '../reducers/searchReducer'
import stockServices from '../services/stockServices';
import { Line } from 'react-chartjs-2';
import Nav from './Nav'

function FinancialPage() {
    const [selections, setSelections] = useState(
        [
            true, true, false
        ]
        )
    const [dropDown, setDropDown] = useState(false);

        //Revenue, Profit, Gross Margins

        // for each selections, if true, then concat dataSetsArr. If false nothing.

    let finalArr = [];
    console.log('FINALARRRRR', finalArr)

    
    const dispatch = useDispatch();
    console.log('What')
    console.log('state:', useSelector(state=> state));

    let ticker = useSelector(state => state.search)
    console.log('state:', useSelector(state=> state));
    useEffect(() => {
        const fetchData = async () => {
            const stockData = await stockServices.getStockData(ticker);
            console.log('STOCK DATA', stockData)
            dispatch(foundStock(stockData))        
        }
        fetchData()


    },[ticker])
    const stock = useSelector(state => state.stock);

    const formatTitle = (str) => {
        if(str.split(' ')[0] === "Alphabet") return 'Alphabet (Google)'
        let title = str.toLowerCase().split(' ')
       .map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
       return title;
       
    }

    const data = {
        labels: stock.map((el) =>{
           return el['Fiscal Year']
        }) ,
        datasets: finalArr
        // datasets: [
        //   {
        //     label: 'Revenue',
        //     data: stock.map(el => el['Revenue']),
        //     fill: false,
        //     backgroundColor: 'rgb(255, 99, 132)',
        //     borderColor: 'rgba(255, 99, 132, 0.2)',
        //     yAxisID: 'first-y-axis'
        //   },
        //   {
        //       label: 'Profit',
        //       data: stock.map(el => el['Net Income']),
        //       fill: false,
        //       backgroundColor: 'rgb(28, 115, 226)',
        //       borderColor: 'rgba(28, 115, 226, 0.2)',
        //       yAxisID: 'first-y-axis'
        //   },
        //   {
        //     label: 'Gross Margin %',
        //     data: stock.map(el => el['Gross Profit']/el['Revenue']),
        //     fill: false,
        //     backgroundColor: 'rgb(200, 200, 20)',
        //     borderColor: 'rgba(200, 200, 20, 0.2)',
        //     yAxisID: 'second-y-axis'
        // },


        // ],
      }

      //legend clicked
      const legendClickHandler = (e, legendItem) => {
        console.log('EVENT', e)
        console.log('legenditem', legendItem)

        let newArr = [...selections];
        switch(legendItem.text){
                case "Revenue":
                    newArr[0] = false;
                    break;
                case "Profit":
                    newArr[1] = false;
                    break;
                case "Gross Margin %":
                    newArr[2] = false;
                    break;
                default:
                    break;
        }
        console.log('newARR!!!!!!!!!!', newArr)
        setSelections(newArr)
      }
      
      const options = {
          
        legend: {
            display: true,
            onClick: legendClickHandler
        },
        tooltips: {
              callbacks: {
                  label: function(tooltipItem, data) {


                    if(data.datasets[tooltipItem.datasetIndex].yAxisID === 'second-y-axis'){
                        return `${(tooltipItem.yLabel * 100).toFixed(2)}%`
                    }
                    return `$${Math.round(tooltipItem.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  }
              }
        },
        scales: {
          yAxes: [
            {
                id: 'first-y-axis',
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return `$${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    }
                },
                gridLines: {
                    display: true,
                },
                scaleLabel: {
                    display: true,
                    // labelString: 'Revenue & Profit'
                },
                position: 'left'
            },
            {
                id: 'second-y-axis',
                ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                        return `${Math.round(value* 100)}%`
                        }
                },
                gridLines: {
                    display: false,
                },
                position: 'left'
            }
           
          ],
            xAxes: [
                {
                    gridLines:{
                        display: true,

                    },
                }
            ],
        },
      }

      const dataSetsBulk = [
        {
          label: 'Revenue',
          data: stock.map(el => el['Revenue']),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          yAxisID: 'first-y-axis'
        },
        {
            label: 'Profit',
            data: stock.map(el => el['Net Income']),
            fill: false,
            backgroundColor: 'rgb(28, 115, 226)',
            borderColor: 'rgba(28, 115, 226, 0.2)',
            yAxisID: 'first-y-axis'
        },
        {
          label: 'Gross Margin %',
          data: stock.map(el => el['Gross Profit']/el['Revenue']),
          fill: false,
          backgroundColor: 'rgb(200, 200, 20)',
          borderColor: 'rgba(200, 200, 20, 0.2)',
          yAxisID: 'second-y-axis'
      },

    ]

   
    selections.forEach((el, i) => {
        console.log('el', el)
        //if the selections element is true
        if(el) {
            //push the dataSetsBulk object to be displayed
            finalArr.push(dataSetsBulk[i])
            
        }
    })

    const handleSelection = (ev) => {
        console.log('SELECTION', ev)
    }

    const handleDropDown = () => {
        setDropDown(!dropDown)
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        console.log('EVENIJEI', event.target.innerHTML)
        console.log(event)
        // if(event.target.innerHTML !== "DropDown"){
        //     setDropDown(false)
        // }
    }

    console.log('finalArr',finalArr)
   
 
    return (
        <>
            <Nav/>
            <div className="financial-page">
                {stock.length !== 0 ? 
                <>
                <h2>{formatTitle(stock[0].name)}</h2>

                <div className = "graph-container">
                    <div className="dropdown">
                        {/* <form>
                            <label>Add Metric</label>
                            <select name="metrics" onChange={handleSelection} multiple>
                                <option value="revenue">Revenue</option>
                                <option value="profit">Net Income</option>
                                <option value="grossMarginPercent">Gross Margin %</option>
                            </select>
                        </form> */}

                        <button onClick={handleDropDown}>DropDown</button>
                        {dropDown ?
                            <div id="myDropDown" className="dropdown-content">
                            <div onClick={()=> handleSelection(0)}>Revenue</div>
                            <div onClick={() => handleSelection(1)}>Profit</div>
                            <div onClick={() => handleSelection(2)}>Gross Margin %</div>
                            </div> 
                            : <></>  
                    }
                       
                    </div>
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
