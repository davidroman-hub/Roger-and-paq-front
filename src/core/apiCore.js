import {API} from '../Config'
import queryString from 'query-string'

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

// method for list the input search
// we have to install another packager called npm i query-string to
// this method is for fectg the products in the method search data

export const list = params => {
    const query = queryString.stringify(params)
    console.log('query', query)

return fetch(`${API}/products?{query}`,{
    method: 'GET'
})
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));

}