import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


// Core

import Home from './core/Home'

// User

import Signin from './user/Signin'
import Signup from './user/Signup'




const Routes = () => { 
  return(
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component = { Home }/>
        <Route path='/signin' exact component = { Signin } /> 
        <Route path='/signup' exact component = { Signup } /> 
      </Switch>
    </BrowserRouter>
  )
}




export default Routes;
