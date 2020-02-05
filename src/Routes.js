import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'

// Core

import Home from './core/Home'
import Menu from './core/Menu'
// User

import Signin from './user/Signin'
import Signup from './user/Signup'
import Dashboard from './user/userDashboard'



const Routes = () => { 
  return(
    <BrowserRouter>
      <Menu/>
      
      <Switch>  
          <Route path = '/' exact component = { Home }/>
          <Route path = '/signin' exact component = { Signin } /> 
          <Route path = '/signup' exact component = { Signup } /> 
          <PrivateRoute path='/dashboard' exact component = { Dashboard}/>
      </Switch>
    </BrowserRouter>
  )
}




export default Routes;
