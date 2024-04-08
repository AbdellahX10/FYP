import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'
import Blog from './views/Blog'
import Header from './views/Header'
import PricePrediction from './views/PricePrediction'
import Valuation from './views/Valuation'
import Pricing from './views/Pricing'
import Footer from './views/Footer'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import WatchList from './views/WatchList'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header/>
        <Switch>
          <PrivateRoute component={PricePrediction} path="/PricePrediction" exact />
          <PrivateRoute component={Valuation} path="/Valuation" exact />
          <PrivateRoute component={Pricing} path="/Valuation/Pricing" exact />
          <PrivateRoute component={WatchList} path="/WatchList" exact />
          <Route component={SignIn} path="/login"/>
          <Route component={SignUp} path="/register"/>
          <Route component={Blog} path="/"/>

        </Switch>
        <Footer title="The Watch Specialists" description="All Rights Reserved"/>
      </AuthProvider>
    </Router>
  );
}

export default App;
