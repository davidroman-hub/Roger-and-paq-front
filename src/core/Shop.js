import React, {useState,useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories, getFilteredProducts} from './apiCore'
import Checkbox from './Checkbox'
import{prices} from './FixedPrices'
import RadioBox from './RadioBox'
import Search from './Search'

const Shop = () => { 
// Setting the filters with the category and price
    // state
    const [myFilters, setMyFilters] = useState ({
        filters:{category:[], price:[]}
    })

/// Method to get the categories using state ///
    // state to get the gategories:
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [size, setSize] = useState(0)//<-- state for load more products
    const init = () => { 
        getCategories().then ( data => {
            if(data.error){
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
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
                // button for charge more products
                setSize(data.size)// <--here
                setSkip(0)
            }
        } 
    ) 
}



useEffect(()=>{
    init();
    loadFilteredResults(skip,limit,myFilters.filters)
}, []);

// load buttton

// first the mehtod for load more
const loadMore= () => { 
let toSkip = skip + limit // remember the skip its 0 but the limit its 6, we gona show 6 more
//console.log(newFilters)

getFilteredProducts(toSkip,limit, myFilters.filters).then(
    data => {
        if(data.error){
            setError(data.error)
        } else {
            setFilteredResults([...filteredResults,...data.data]);
            //button for charge more productsByArrival
            setSize(data.size)
            setSkip(toSkip)//<-- and here
            }
         }
    )
};

const loadMoreButton = () => {
    return(
        size > 0 && size >= limit && (
            <button onClick={loadMore} className="btn btn-warning mb-5"> Ver mas</button>
        )
    )
}



    return(
        <Layout title='Tienda' 
        description='Busca y encuentra Ropa de tu agrado!' 
        className='container-fluid'>
            <Search/>
            <div className='row'>
                <div className='col-4'>
                {/* {JSON.stringify(categories)} */}
                    <h4> Categoria</h4>
                    <ul>
                        <Checkbox categories={categories}
                        handleFilters={ filters => 
                        handleFilters(filters,"category")
                        }
                        />
                    </ul>

                    <h4>Rango de precios</h4>
                        <div>
                            <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                            handleFilters(filters,"price")}
                            />
                        </div>

                </div>
                
                <div className='col-8'>
                    {/* {JSON.stringify(filteredResults)}
                   {JSON.stringify(myFilters)} */}
                   <h2 className='mb-4'>Productos</h2>
                   <div className='row'>
                       {filteredResults.map((product,i)=>(
                           <div key={i} className='col-10 ml-4 mb-3'>
                                <Card  product={product}/>
                            </div>   
                          
                       ))}
                   </div>
                   <hr/>
                   {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop