import React, { useEffect } from 'react'
import './css/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import FinancialPage from './components/FinancialPage'
import authServices from './services/authServices'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthenticated } from './reducers/authReducer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


function App() {
    //authentication

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    async function isAuth(){
      console.log('isauth being run')
        try {
          const response = await authServices.isVerify();
          console.log('verify response', response)
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
