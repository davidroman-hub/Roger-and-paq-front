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