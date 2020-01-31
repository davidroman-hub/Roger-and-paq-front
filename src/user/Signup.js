import React,{ useState } from 'react'
import {API} from '../Config' 
import Layout from '../core/Layout'
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

    const {name, email, password} = values

    const clickSubmit = event => {
        event.preventDefault();
        signup({name, email, password}) //<-- i changed for an object {} to i can use in user 
    }

    // Signup method: 

    const signup = user => { //The argument user come from clickSubmit otherwise i have to use  const signup = (name, email, password)
      //  console.log(name, email, password) 
        fetch(`${API}/signup`,{
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type" : "application/json"
            },body:JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        } )
        .catch(err => {
            console.log(err);
        });
    };


    //funtion to take the state

    const handleChange = name => event=> {
        setValues({...values, error:false, [name]:event.target.value})
    }



    const signUpForm = () =>( 
    <form  className='SignUpForm'>
        
        <div className = 'container'>
            <p>
                <label>
                     <input onChange={handleChange('name')} placeholder="Nombre:" type="text"  />
                </label>
            </p>
            <p>
                <label>
                   <input onChange={handleChange('email')} placeholder="E-mail:" type="email"  />
                </label>
            </p>
            <p>
                <label>
                   <input onChange={handleChange('password')} placeholder="Contraseña:" type="password"  />
                </label>
            </p>
        </div> 
            <button onClick={clickSubmit} >Submit</button> 
    </form>
    
    )


    return(
    <Layout title = "Sign Up" description = "Rogen and Paq Sign up" >
       
       {/* {API} */}
        {signUpForm()}
        {JSON.stringify(values)}

    </Layout>)
}
export default Signup