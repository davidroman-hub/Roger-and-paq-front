import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuth} from '../auth/index'


import Logo from './logo.png'
import './Menu.scss'

const isActive = (history, path) =>{
    if(history.location.pathname === path){
        return{color:'#ff9900'}
    } else{
        return{'color': '#000'}
    }
}


const Menu = ({history}) =>( 

<div> 
  <ul class="navbar navbar-expand-lg navbar-light bg-light">
    <Link className='nav-color' class="nav-link" to='/'>
      <img alt='logo' width='60px' height='60px' src={Logo}/>
    </Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>


  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      {/* <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="#">Features</a>
      <a class="nav-item nav-link" href="#">Pricing</a>
      <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> */}
   <li> <Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link></li>
   
   {!isAuth () && ( 
   <Fragment><li><Link className="nav-link" style={isActive(history,'/signin')} to="/signin">Inicia Sesión </Link></li>
             <li> <Link className="nav-link" style={isActive(history,'/signup')} to="/signup"> Crea tu usuario </Link></li>
   </Fragment>)}
   
   {isAuth () && (
     <span className="nav-link" 
     style={{cursor:'pointer', color:'#000'}} 
     onClick={() => signout 
      (()=>{history.push('/');})} > Salir de la sesión </span>
   )}
    
  </div>
  </div>
</ul>

    </div>


     



)

export default withRouter(Menu)