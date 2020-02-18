import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import { read } from './apiCore'
import Card from './Card'

// 1 .- we need to create the method in api core for read the product


const Product = (props) => {

    //2.- State for the product

    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)


    //4 

    const loadSingleProduct = productId =>{
        read(productId).then( data => {
            if (data.error){
                setError(data.error)
            } else {
                setProduct(data)
            }
        })
    }


    // 3.- component mount

    useEffect(() => {
        const productId = props.match.params.productId // this is for tkae the id from the product
        
        loadSingleProduct(productId)
    
    },[])

    return (
        <Layout title='Product' 
        description='product view'
        className='container-fluid'
        >
            product page
        <h2 className='mb-4'>Single Product</h2>
        <div className='row'>
            {JSON.stringify(product)}
        </div>
        </Layout>
    )
}
export default Product