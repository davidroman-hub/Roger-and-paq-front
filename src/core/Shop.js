import React, {useState,useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories} from './apiCore'
import Checkbox from './Checkbox'


const Shop = () => { 

// Setting the filters with the category
    // state
const [myFilters, setMyFilters] = useState ({
    filters:{category:[], price:[]}
})

const handleFilters = (filters, filterBy) => {
    //console.log('SHOP', filters,filterBy)
    const newFilters = {...myFilters}
    newFilters.filters[filterBy] = filters
    setMyFilters(newFilters)
}




/// Method to get the categories using state ///
    // state to get the gategories:
     const [categories, setCategories] = useState([])
     const [error, setError] = useState(false)

    const init = () => { 
        getCategories().then ( data => {
            if(data.error){
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

useEffect(()=>{
    init()
}, []);






    return(
        <Layout title='Tienda' 
        description='Busca y encuentra Ropa de tu agrado!' 
        className='container-fluid'>
            <div className='row'>
                <div className='col-4'>
                {/* {JSON.stringify(categories)} */}
                    <h4> Busca por categoria</h4>
                    <ul>
                        <Checkbox categories={categories}
                        handleFilters={ filters => 
                        handleFilters(filters,"category")
                        }
                        />
                    </ul>
                </div>
                
                <div className='col-8'>
                   {JSON.stringify(myFilters)}
                </div>
            </div>
        </Layout>
    )
}

export default Shop