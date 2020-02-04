import {API} from '../Config'



// sign up method

export const signup = user => {

return fetch(`${API}/signup`,{
    method: "POST",
    headers:{
        Accept:'application/json',
        "Content-Type":"application/json"
    },
    body:JSON.stringify(user) //<-- THE USER ARGUMENT WILL COME FROM THE CLICK SUBMIT AND WE CAN USE LIKE AN ARGUMENT
 //    body:JSON.stringify(name, email, password)
})
.then( response => {
    return response.json()
})
 .catch(err =>{
     console.log(err);
 });
}; 


// Sign in method


export const signin = user => { 
    
        return fetch(`${API}/signin`,{
            method: "POST",
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user) //<-- THE USER ARGUMENT WILL COME FROM THE CLICK SUBMIT AND WE CAN USE LIKE AN ARGUMENT
         //    body:JSON.stringify(name, email, password)
        })
        .then( response => {
            return response.json()
        })
         .catch(err =>{
             console.log(err);
         });
        };

 // Authenticated method -->  it will be a method for save user and token inlocal storage

 export const authenticate = (data, next) => {
     if(typeof window !== 'undefined') { 
         localStorage.setItem ('jwt', JSON.stringify(data))// <-- setItem for save data from jwt 
         next()
     }
 }