import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'

const Home = () =>{
    
//state for get the products from

const [productsBySell, setProductsBySell] = useState([])
const [productsByArrival, setProductsByArrival] = useState([])
const [error,setError] = useState(false)

//Method 

const loadProductsBySell = () => {
    getProducts('sold').then( data => {
        if (data.error){
            setError(data.error)
        } else {
            setProductsBySell(data)
        }
    })
}

const loadProductsByArrival = () => {
    getProducts('createdAt').then( data => { //createdAt it is when we was created the products remember this
        if (data.error){
            setError(data.error)
        } else {
            setProductsByArrival(data)
        }
    })
}


useEffect(()=>{
    loadProductsBySell()
    loadProductsByArrival()
})
    
    return(
<Layout title='Home page' description='Node react e-commer roger and paq'>
    {JSON.stringify(productsBySell)}
    <hr />
    {JSON.stringify(productsByArrival)}
</Layout>
    )
}

export default Home