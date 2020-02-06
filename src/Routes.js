import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'

// Core

import Home from './core/Home'
import Menu from './core/Menu'
// User

import Signin from './user/Signin'
import Signup from './user/Signup'
import Dashboard from './user/userDashboard'
import AdminDashboard from './user/AdminDashboard'



const Routes = () => { 
  return(
    <BrowserRouter>
      <Menu/>
      
      <Switch>  
          <Route path = '/' exact component = { Home }/>
          <Route path = '/signin' exact component = { Signin } /> 
          <Route path = '/signup' exact component = { Signup } /> 
          <PrivateRoute path='/user/dashboard' exact component = { Dashboard}/>
          <AdminRoute path='/admin/dashboard' exact component = { AdminDashboard}/>

      </Switch>
    </BrowserRouter>
  )
}




export default Routes;
