import React, { useState } from 'react'
import {Redirect}from 'react-router-dom'
import Layout from '../core/Layout'
import {signin, authenticate, isAuth} from '../auth/index'
import './Signin.scss'


const Signin = () =>{

    //state
    const [values, setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectToReferrer: false, // to redirect qhen the sign in its succes

    })

    //destructarin the values with another function:

const {email, password, error, loading, redirectToReferrer } = values

const{user} = isAuth()
// funtion will return another function for take the state
 

const handleChange = name => event => {
    //we have to take all the values thats why i used " ... "
    setValues({...values, error:false, [name]:event.target.value});
}


const clickSubmit = (event) => { 
    event.preventDefault();
    setValues({ ...setValues,error:false, loading:true })
    signin({email, password})//<-- WHE CHANGED FOR AND OBJECT {} FOR USE IN USER// <-- and we are using sign up from here
    
    
    .then( data => {
        if(data.error){
            setValues({...values, error: data.error, loading: false}) //if the form is bad it will be succes false
        } else {
            authenticate(data, () => { 
                setValues({
                    ...values,//<-- we want to use all the values
                   redirectToReferrer:true // if everything its correct it will be true
                });
            })
        };
    });
};

const signInForm = () =>( 
    <form  className='SignInForm'>
        
        <div className = 'container'>
           
            <p>
                <label>
                   <input onChange={handleChange('email')} placeholder="E-mail:" type="email" value={email} />
                </label>
            </p>
            <p>
                <label>
                   <input onChange={handleChange('password')} placeholder="Contraseña:" type="password" value={password} />
                </label>
            </p>
        </div> 
            <button onClick={clickSubmit} >Entrar</button> 
    </form>
    
    )


  //two funtions for show the Error and success

  const showError = () => { 
    return( <div className="alert alert-danger" style={{display:error ? '' : 'none'}}> 
         {error}
     </div>
    )
 }
 const showLoading = () => { 
     return(
     loading && (<div className='alert alert-info'><h2>Info</h2></div>)
         )
 };

//  const redirectUser = () => { 
//      if(redirectToReferrer){
//         if(user && user.role === 1) {
//             return <Redirect to='/admin/dashbord'/>
//         } else {
//              return <Redirect to='/user/dashboard'/>
//         }
//      };
//  };
const redirectUser = () => { 
    if(redirectToReferrer){
       if(user && user.role === 1) {
           return <Redirect to='/admin/dashboard'/>
       } else {
            return <Redirect to='/user/dashboard'/>
       }
    }
}

 return(
    <Layout title='Sign in Page' 
    description="Sign un to Node React e-Commerce app"
    className="container col-md-8 offset-md-2">   

        {showLoading()}
        {showError()}
        {signInForm()}
        {redirectUser()}
        {/* {JSON.stringify(values)} this is for see the state if values are worling in the handleChange */}
    </Layout> 
)




} 




export default Signin