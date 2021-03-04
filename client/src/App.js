import React from 'react'
import './css/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import FinancialPage from './components/FinancialPage'


function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path="/financials" >
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
