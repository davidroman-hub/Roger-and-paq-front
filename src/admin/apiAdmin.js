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


//Method to get the categories from the database

export const getCategories = () => { 
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
    .then (response => { 
        return response.json()
    })
    .catch (err => console.log(err))
}

//orders in api dashboard

export const listOrders = (userId,token) => { 
    return fetch(`${API}/order/list`, {
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then (response => { 
        return response.json()
    })
    .catch (err => console.log(err))
}