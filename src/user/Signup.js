import React,{ useState } from 'react'
//import {API} from '../Config' 
import {signup} from '../auth/index'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import './Signup.scss'



const Signup = () => {

    // State 
    
    const [values, setValues] = useState ({
        
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });

    //Unstructuring the code 

    const {name, email, password, success, error} = values

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...setValues, error:false})
        signup({name, email, password}) //<-- i changed for an object {} to i can use in user 
       
        //For clean the form and handle error

       .then( data => {
           if(data.error){
               setValues({...values, error:data.error, success:false})
           } else {
               setValues({
                   ...values,
                   name:'',
                   email:'',
                   password:'',
                   error:'',
                   success:true
               })
           }
       })

    
    }




    //funtion to take the state

    const handleChange = name => event=> {
        setValues({...values, error:false, [name]:event.target.value})
    }

 




    const signUpForm = () =>( 
    <form  className='SignUpForm'>
        
        <div className = 'container'>
            <p>
                <label>
                     <input onChange={handleChange('name')} placeholder="Nombre:" type="text" value={name} />
                </label>
            </p>
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
            <button onClick={clickSubmit} >Submit</button> 
    </form>
    
    )


    // Funtion to show the Error and Succes

    const showError = () => {
        return(<div className='alert alert-danger' 
            style={{display:error ? '': 'none'}} >
            {error}
        </div>)
    } 

    const showSucces = () => { 
        return( <div className='alert alert-info'
        style={{display:success ? '' :'none'}} >
            Nuevo usario Creado, porfavor <Link to='/signin'> inicia sesion </Link>
        </div>)
    } 






    return(
    <Layout title = "Sign Up" description = "Rogen and Paq Sign up" >
       
       {/* {API} */}
        {signUpForm()}
        {showSucces()}
        {showError()}
        {/* {JSON.stringify(values)} */}

    </Layout>)
}
export default Signup