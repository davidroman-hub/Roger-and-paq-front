
import React,{useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import {getProducts, deleteProduct} from './apiAdmin'

const ManageProducts = () => { 

const [products, setProducts] = useState([])
const {user,token} = isAuth()

useEffect(() => {
    loadProducts()
},[])

/// get all the products from the back ///

const loadProducts = () => {
    getProducts().then(
        data =>{ 
            if(data.error){
                console.log(data.error)
            } else {
                setProducts(data)
            }
       }
    )
}

/// delate Product ///

const destroy = productId => {
    deleteProduct(productId,user._id, token).then(
        data => {
            if(data.error){
                console.log(data.error)
            }else{
                loadProducts()
            }
        }
    )
}

const productList = () => {
    return (
        <div className='col-14'>
        <ul className='list-group pl-4'>
            {products.map((p,i)=>(
                <li key={i} className='list-group-item justify-content-between align-items-center pl-4'>
                    <strong>{p.name}</strong>
                    <Link to={`/admin/product/update/${p.id}`}>
                        <span className='badge badge-warning badge-pill'>Update</span>
                    </Link>                   
                    <span onClick={()=> destroy(p._id)}
                     className='badge badge-danger badge-pill'>
                         Delate
                    </span>
                </li>
            ))}
        </ul>
    </div>  
    )
}



    return (
        <Layout title="Manage Products" 
        description="Manage all the products here"
        className='container-fluid'
        >
            <div className='row'>
                <div className=''>
                   {productList()}
                </div>
            </div>


    </Layout>
    )
}

export default ManageProducts