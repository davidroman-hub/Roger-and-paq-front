import React, {useState,useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories, getFilteredProducts} from './apiCore'
import Checkbox from './Checkbox'
import{prices} from './FixedPrices'
import RadioBox from './RadioBox'


const Shop = () => { 


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

// Setting the filters with the category
    // state
const [myFilters, setMyFilters] = useState ({
    filters:{category:[], price:[]}
})

    
//Handle price for the prices

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if(data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array;
    }


// Method for show the products with the filters

// state

const [limit, setLimit] = useState(6) //<-- limit of 6 products
const [skip, setSkip] = useState(0)
const [filteredResults, setFilteredResults] = useState([])



// for filter  method when you made a click
const loadFilteredResults = newFilters => {
    //console.log(newFilters)
    getFilteredProducts(skip,limit,newFilters).then( data => {
            if (data.error){
                setError(data.error)
            } else {
                setFilteredResults(data.data)
            }
        } 
    ) 
}
const handleFilters = (filters, filterBy) => {
    //console.log('SHOP', filters,filterBy)
    const newFilters = {...myFilters}
    newFilters.filters[filterBy] = filters

    // Filter for the price filter method
    if(filterBy === 'price'){
        let priceValues = handlePrice(filters)
        newFilters.filters[filterBy] = priceValues;        
    }
    loadFilteredResults(myFilters.filters)//<-- for applicate the filters to a price and products
    setMyFilters(newFilters)
};


useEffect(()=>{
    init();
    loadFilteredResults(skip,limit,myFilters.filters)
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

                    <h4>Filtrar por rango de precios</h4>
                        <div>
                            <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                            handleFilters(filters,"price")}
                            />
                        </div>

                </div>
                
                <div className='col-8'>
                    {JSON.stringify(filteredResults)}
                   {JSON.stringify(myFilters)}
                </div>
            </div>
        </Layout>
    )
}

export default Shop