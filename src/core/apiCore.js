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
    console.log('query',query)
    return fetch(`${API}/products/search?${query}`, {

        method: "GET"
    })   
        .then(response => {
            return response.json();
        })
      
        .catch(err => console.log(err));
};

// the read method to get the product from the page and

export const read = productId => {
    return fetch(`${API}/product/${productId}`,{
        method: "GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

// get the related products method

export const listRelated = productId => {
    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET'
    })
    .then( response => {
        return response.json()
    })
    .catch(err => console.log(err))
} 


// to take the token from the backend from braintree i have to made another methods for take them

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`,{
        method:"GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then ( response => {
        return response.json()
    })
    .catch( err => console.log(err))
}

// Process to payment method

export const processPayment = ( userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`,{
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => console.log(err))
}

// create order from the backend

export const createOrder = ( userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({order:createOrderData})
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => console.log(err))
}
