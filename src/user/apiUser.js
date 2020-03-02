import {API} from '../Config'
//Read//
// we need to read the user information first for update after


export const read =(userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



/// Update the user ///

export const update = ( userId, token,user) => {
    return fetch(`${API}/user/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch( err => console.log(err))
}


// update user in local storage //

export const updateUser = ( user, next) => {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('jwt')){
            let auth =JSON.parse( localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt',JSON.stringify(auth))
            next()
        }
    }
}


/// get orders purchase history ///

export const getPurchaseHistory =(userId, token) => {
    return fetch(`${API}/orders/by/user/${userId}`, {
        method: "GET",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}; 