import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { foundStock } from '../reducers/stockReducer'
import { isLoading } from '../reducers/loadingReducer'
import stockServices from '../services/stockServices';
import portfolioServices from '../services/portfolioServices';
import { Line } from 'react-chartjs-2';
import { RiAddCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import Nav from './Nav'
import DisplayModal from './DisplayModal'
import {ClipLoader} from 'react-spinners'
import { toast } from "react-toastify";

function FinancialPage() {
    const [selections, setSelections] = useState(
        [
            true, true, false, false
        ])
         //Revenue, Profit, Net Profit %, Gross Margins %
    
    const [dropDown, setDropDown] = useState(false);
    const [isPartOfPortfolio, setIsPartOfPortfolio] = useState(false)
    const [hoverText, setHoverText] = useState('Following')

    let finalArr = [];
    // let state = useSelector(state => state);
    // console.log('STATE', state)

    
    const dispatch = useDispatch();

    let ticker = useSelector(state => state.search)
    let loadingData = useSelector(state => state.loading)
    let auth = useSelector(state => state.auth)

    useEffect(() => {
        let mounted = true;
        
        const fetchData = async () => {
            const stockData = await stockServices.getStockData(ticker);
            // setLoadingData(false);
            if(mounted) {
                dispatch(isLoading(false))
                dispatch(foundStock(stockData))
            }      
        }
        fetchData()

        return () => mounted = false;
    },[ticker])

    useEffect(() => {
         //check if user has stock added to portfolio
         const checkPortfolio = async () => {
            if(auth){
                const stockCheck = await portfolioServices.stockCheck(ticker.toUpperCase());
                console.log('stockcheck', stockCheck.result)

                setIsPartOfPortfolio(stockCheck.result)
            }
         }
         checkPortfolio();
    },[ticker,auth])


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

        let newArr = [...selections];
        switch(legendItem.text){
                case "Revenue":
                    newArr[0] = false;
                    break;
                case "Net Income":
                    newArr[1] = false;
                    break;
                case "Profit Margin %":
                    newArr[2] = false;
                    break;
                case "Gross Margin %":
                    newArr[3] = false;
                    break;
                default:
                    break;
        }

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
          yAxes: 
          [
            {
                id: 'first-y-axis',
                display: (selections[0] || selections[1]),
                ticks: {
                    beginAtZero: true,
                    // maxTicksLimit: 4,
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
                display: (selections[2] || selections[3]),
                ticks: {
                        beginAtZero: true,
                        // maxTicksLimit: 4,
                        callback: function(value, index, values) {
                        return `${Math.round(value* 100)}%`
                        }
                },
                gridLines: {
                    display: !(selections[0] || selections[1]),
                },
                position: 'right'
            }
           
          ],
            xAxes: [
                {
                    gridLines:{
                        display: true,

                    },
                    ticks:{
                        // maxTicksLimit: 4
                    }
                }
            ],
        },
      }

      // array that holds each dataset. Selections array will get looped through and each element that is true based on the selections array will cause the element in the dataSetsBulk array to be pushed to the finalArr
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
            label: 'Net Income',
            data: stock.map(el => el['Net Income']),
            fill: false,
            backgroundColor: 'rgb(28, 115, 226)',
            borderColor: 'rgba(28, 115, 226, 0.2)',
            yAxisID: 'first-y-axis'
            },
            {
            label: 'Profit Margin %',
            data: stock.map(el => el['Net Income']/el['Revenue']),
            fill: false,
            backgroundColor: 'rgb(88, 184, 147)',
            borderColor: 'rgba(88, 184, 147, 0.2)',
            yAxisID: 'second-y-axis'
            },
            {
            label: 'Gross Margin %',
            data: stock.map(el => el['Gross Profit']/el['Revenue']),
            fill: false,
            backgroundColor: 'rgb(200, 200, 20)',
            borderColor: 'rgba(200, 200, 20, 0.2)',
            yAxisID: 'second-y-axis'
            }
        ]


   //Based on selections array, create the final array of data to be displayed.
  
    selections.forEach((el, i) => {
        //if the selections element is true
        if(el) {
            //push the dataSetsBulk object to be displayed
            finalArr.push(dataSetsBulk[i])
        }
    })  

    const handleSelection = (i) => {
        let newArr = [...selections]
        for(let j = 0; j < selections.length; j++){
            if(i === j) newArr[i] = true;
        }
        setSelections(newArr);
    }

    const handleDropDown = () => {
        setDropDown(!dropDown)
    }

    const handleAddStock = async () => {
        const res = await portfolioServices.addStock(ticker.toUpperCase());
        if(res === ticker.toUpperCase()){
            toast.success(`${ticker.toUpperCase()} added to your portfolio!`)
            setIsPartOfPortfolio(true);
        }
    }

    const handleRemoveStock = async () => {
        console.log('Removing Stock!')
        const res = await portfolioServices.removeStock(ticker.toUpperCase());
        if(res === ticker.toUpperCase()){
            toast.success(`${ticker.toUpperCase()} removed from your portfolio!`)
            setIsPartOfPortfolio(false);
        }
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if(event.target.innerHTML.slice(0,8) !== buttonText && event.target.innerHTML !== "Revenue" && event.target.innerHTML !== "Net Income" && event.target.innerHTML !== "Gross Margin %" && event.target.innerHTML !== "Profit Margin %"){
            setDropDown(false)
        }
    }

    // for window.onclick function to select innerHTML
    const buttonText = `Add Data`

    return (
        <>
            <Nav/>
            <div className="financial-page">
           
            {
                loadingData ? 
                <div className = "loading-container">
                <ClipLoader color={'#2A5BAA'} size={48} />
                </div>
                
                :<>

                {stock.length !== 0 ? 
                <>
                

                <div className = "graph-container">
                    <div className ="graph-header">
                        <h2>{formatTitle(stock[0].name)}
                        {auth 
                        ?  <> {isPartOfPortfolio 
                            ? <span onClick={handleRemoveStock} onMouseOver={() => setHoverText('Unfollow')} onMouseLeave={()=> setHoverText('Following')} className="graph-remove">{hoverText} <RiCloseCircleFill className="graph-follow-icon"/> </span> 
                            : <span onClick={handleAddStock} className="graph-add">Add to Portfolio <RiAddCircleFill className="graph-follow-icon"/></span>  } 
                        </>
                        
                        
                        : <span></span> }
                        </h2>
                        
                    </div>
                    <h4>{stock[0].sector}</h4>
                    <div className="dropdown">
                        <button className="dropbtn" onClick={handleDropDown}>Add Data &nbsp; &nbsp; &nbsp; {dropDown ? '▲' :'▼' }</button>
                        {dropDown ?
                            <div id="myDropDown" className="dropdown-content">
                                <div onClick={()=> handleSelection(0)}>Revenue</div>
                                <div onClick={() => handleSelection(1)}>Net Income</div>
                                <div onClick={() => handleSelection(2)}>Profit Margin %</div>
                                <div onClick={() => handleSelection(3)}>Gross Margin %</div>
                            </div> 
                            : <></>  
                    }
                       
                    </div>
                    <Line data={data} options = {options} />
                </div>
                
                </> :
                <p>Company Not Found. Please search for another Company</p>}

            </>
            }
            </div>
            <DisplayModal />
         
          
        </>
    )
}

export default FinancialPage
