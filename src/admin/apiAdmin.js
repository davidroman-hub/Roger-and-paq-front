import {API} from '../Config'

//Method to create a new category

export const createCategory = (userId, token, category) => {

    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })

    .then(response => {
        return response.json(); 
    })
    .catch( err => { 
        console.log(err)
    })

}



//Method to create a new product

export const createProduct = (userId, token, product) => {

    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            // "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: product
    })

    .then(response => {
        return response.json(); 
    })
    .catch( err => { 
        console.log(err)
    })

}