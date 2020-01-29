import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


// Core

import Home from './core/Home'
import Menu from './core/Menu'
// User

import Signin from './user/Signin'
import Signup from './user/Signup'




const Routes = () => { 
  return(
    <BrowserRouter>
      <Switch>
        <Menu/>
        <Route path='/' exact component = { Home }/>
        <Route path='/signin' exact component = { Signin } /> 
        <Route path='/signup' exact component = { Signup } /> 
      </Switch>
    </BrowserRouter>
  )
}




export default Routes;
