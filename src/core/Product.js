import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'

// 1 .- we need to create the method in api core for read the product


const Product = (props) => {

    //2.- State for the product

    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([]) //<-- state for related products
    const [error, setError] = useState(false)


    //4 

    const loadSingleProduct = productId =>{
        read(productId).then( data => {
            if (data.error){
                setError(data.error)
            } else {
                setProduct(data)
              //when we finish to 
              //fetch the product we nned to fetch the related product
                listRelated(data._id).then(
                    data => { if (data.error){
                        setError(data.error)
                        } else {
                            setRelatedProduct(data)
                        }
                    }
                )



            }
        })
    }


    // 3.- component mount

    useEffect(() => {
        const productId = props.match.params.productId // this is for tkae the id from the product
        
        loadSingleProduct(productId)
    
    },[props])

    return (
        <Layout title={product && product.name} 
        description={
            product &&
            product.description &&
            product.description.substring(0,100)
        }
        className='container-fluid'
        >
            
        {/* <h2 className='mb-4'>Single Product</h2> */}
        <div className='row'>
            {/* {JSON.stringify(product)} */}
           
           <div className='mb-5 ml-5'>
            {
                product &&
                product.description &&
                <Card product={product} showViewProductButton={false}/>
            }
            </div>
   
            <div className="col-3">
                <h6>Te puede Gustar</h6>
                {relatedProduct.map((product,i)=>(
                    <div className='mb-1'>
                        <Card key={i} product={product}/>
                    </div>
                ))}        
            </div>    
        </div>
        </Layout>
    )
}
export default Product