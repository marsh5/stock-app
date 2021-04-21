import React, { useState, useEffect } from 'react'
import './css/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import FinancialPage from './components/FinancialPage'
import authServices from './services/authServices'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthenticated } from './reducers/authReducer'


function App() {
    //authentication

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    async function isAuth(){
        try {
          const response = await authServices.isVerify();
          if(response === true){
            dispatch(isAuthenticated(true))
          } else{
            dispatch(isAuthenticated(false))
          }
          // response === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
        } catch (err) {
          console.log('err')
          console.error(err.message)
        }
    }

    useEffect(() => {
      isAuth()
    }, []);



  return (
    <>
    <Router>
      <Switch>
        <Route path="/financials/" >
          <FinancialPage />
        </Route>
        <Route>
          <Home path="/"/>
        </Route>
      </Switch>
    </Router>
   
   </>
  );
}

export default App;
