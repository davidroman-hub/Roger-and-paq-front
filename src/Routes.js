import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'

// Core

import Home from './core/Home'
import Menu from './core/Menu'
import Product from './core/Product.js'
import Cart from './core/Cart'
import Orders from './admin/Orders'

// User

import Signin from './user/Signin'
import Signup from './user/Signup'
import Dashboard from './user/userDashboard'
import Shop from './core/Shop'
import Profile from './user/Profile'

//Admin
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProducts'

const Routes = () => { 
  return(
    <BrowserRouter>
      <Menu/>
      
      <Switch>  
          <Route path = '/' exact component = { Home }/>
          <Route path = '/product/:productId' exact component = { Product }/>
          <Route path = '/cart' exact component = { Cart }/>
          <Route path = '/Shop' exact component = { Shop }/>
          <Route path = '/signin' exact component = { Signin } /> 
          <Route path = '/signup' exact component = { Signup } /> 

          {/* USER Routes */}
          <PrivateRoute path='/user/dashboard' exact component = { Dashboard}/>
          <PrivateRoute path='/profile/:userId' exact component = { Profile }/>

              {/* ADMIN Routes */}

              <AdminRoute path='/admin/dashboard' exact component = { AdminDashboard}/>
              <AdminRoute path='/create/categories' exact component = {AddCategory}/>
              <AdminRoute path='/create/product' exact component = {AddProduct}/>
              <AdminRoute path='/admin/orders' exact component = {Orders}/>
              <AdminRoute path='/admin/product' exact component = {ManageProducts}/>
              <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
      </Switch>
    </BrowserRouter>
  )
}




export default Routes;
