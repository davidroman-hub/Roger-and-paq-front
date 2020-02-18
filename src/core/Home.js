import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'
const Home = () =>{
    
//state for get the products from

const [productsBySell, setProductsBySell] = useState([])
const [productsByArrival, setProductsByArrival] = useState([])
const [error, setError] = useState(false)

//Method 

const loadProductsBySell = () => { 
    getProducts('sold').then( data => {
        if(data.error) {
            setError(data.error)
        }else {
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
    loadProductsByArrival()
    loadProductsBySell()
    
},[])//<-- tenia un problema con el bucle abierto estaba infinito
    
    return(
<Layout title='Home page' description='Node react e-commer roger and paq'>
    {/* {JSON.stringify(productsBySell)}
    <hr />
    {JSON.stringify(productsByArrival)} */}

    <Search/>
<h2 className='mb-4 ml-4'>Lo mas nuevo</h2>
<div className='row'>
    {productsByArrival.map((products,i) =>(
        <div key={i} className='col-5 mb-3 ml-4'>
        <Card  product={products}/>
    </div> 
    ))}
</div>

<h2 className='mb-4 ml-4'>Lo mas vendido</h2>
<div className='row'>
    {productsBySell.map((products,i) =>(
        <div key={i} className='col-5 mb-3 ml-4'>
            <Card  product={products}/>
        </div>   
    ))}
</div>



</Layout>
    )
}

export default Home