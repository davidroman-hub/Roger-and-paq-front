import React from 'react'
//import {API} from '../Config' 
import Layout from '../core/Layout'
import './Signup.scss'

const Signup = () => {
    
    const signUpForm = () =>( 
    <form  className='SignUpForm'>
        
        <div className = 'container'>
            <p>
                <label>
                     <input placeholder="Nombre:" type="text"  />
                </label>
            </p>
            <p>
                <label>
                   <input placeholder="E-mail:" type="email"  />
                </label>
            </p>
            <p>
                <label>
                   <input placeholder="Contraseña:" type="password"  />
                </label>
            </p>
        </div> 
            <button >Submit</button> 
    </form>
    
    )


    return(
    <Layout title = "Sign Up" description = "Rogen and Paq Sign up" >
       
       {/* {API} */}
        {signUpForm()}
    </Layout>)
}
export default Signup