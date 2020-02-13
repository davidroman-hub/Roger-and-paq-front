import React, {useState,useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'

const Shop = () => { 

    return(
        <Layout title='Tienda' 
        description='Busca y encuentra Ropa de tu agrado!' 
        className='container-fluid'>
            <div className='row'>
                <div className='col-4'>
                    lado izquierdo
                </div>
                
                <div className='col-8'>
                    lado Derecho
                </div>
            </div>
        </Layout>
    )
}

export default Shop