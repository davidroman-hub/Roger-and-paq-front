import {API} from '../Config'


//Get products method

export const getProducts = sortBy => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// Get the categories method for the shop

export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method: 'GET'
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}


// method for get the products 
// The method at the backend its post so:

export const getFilteredProducts = (skip, limit, filters = {}) =>
{
    const data = { skip, limit, filters}
    return fetch(`${API}/products/by/search`,{
        method: "POST",
        headers: { 
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(response =>{
        return response.json()
    })
    .catch( err =>{
        console.log(err)
    }) 
}