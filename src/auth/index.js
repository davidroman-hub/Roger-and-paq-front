import {API} from '../Config'


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