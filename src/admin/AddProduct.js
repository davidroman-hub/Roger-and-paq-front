
import React,{useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import { createProduct } from './apiAdmin'

const AddProduct = () => {


//destructure 

const {user, token} = isAuth()

return(

    <Layout title='Agregar nuevo producto'
    description={`Buen dia ${user.name}!, listo para crear un nuevo producto?`}
    >
        <div className='row'>
            <div className='col-md-8 offset-md-2'>
                ....
            </div>
        </div>

    </Layout>

        )
    }


    export default AddProduct