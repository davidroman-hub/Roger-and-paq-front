import React, { useState,useEffect} from 'react'
import {getCategories, list} from './apiCore'
import Card from "./Card"
import './Styles.scss'


const Search = () => { 

// State of search bar

const [ data, setData] = useState({
    categories:[], 
    category:'',
    search:'',
    results:[], 
    searched: false
})

// Destructure 

const {
    categories, 
    category,
    search,
    results, 
    searched
} = data


// we need to show the categories in the nav search

const loadCategories = () => { 
    getCategories().then(data => {
        if (data.error){
            console.log(data.error)
        } else {
            setData({...data, categories:data})
        }
    })
}

useEffect(()=>{
    loadCategories()
},[])

//First step is create the search form


// second step is create the handleChange

const handleChange = (name) => event=> {
    //set data for set the state 
                                                //searched
    setData({...data,[name]:event.target.value, searched:false})
}

// second step is create searchsubmit
const searchSubmit = (e) => {
    //
    e.preventDefault()
    searchData()

}

//thrid steap its create method searchData for made the request to the backend what we need to find

const searchData = () =>{
   // console.log(search,category)//<-- we need to send this information to the backend
   // for fetch the correct product
   // and here we gonna use the method list for  fetch the information list is in 'Apicore/
    if(search){ // the fisrt thing we want to send, if not unde, after its the category                            
        list({search:search || undefined, category:category})
        .then( response =>{
            if(response.error){
                console.log(response.error)
            } else {
                setData({...data,results:response, searched:true})
            }
        })
    }

}

// last step  // after when we found the data and made the new method to the back end we need to put 
// in cards so, the method for render the data its this:

const searchedProducts = ( results = []) => {
    return (
        <div>
             <h2 className="ml-4 mb-4">
                {searchMessage(searched, results)}
            </h2>
        <div className='row'>
            {results.map((product,i)=>(
               <div key={i} className='col-5 mb-3 ml-4' >
               <Card  product={product}/>
           </div>  
            ))}
        </div>
        </div>
    )
}

// and the last thing is  show the message to the users if they found or not something

const searchMessage = (searched, results) => {
    if(searched && results.length > 0){
        return (`Encontramos ${results.length} productos para ti!`)
    }
    if( searched && results.length < 1){
        return (`No encontramos lo que buscas :(`)
    }
}





const searchForm = () => { 

    return(
        <form onSubmit={searchSubmit}>
         <span className='input-group-text'>
             <div className='input-group input-group-lg'>
                <div className='input-group-prepend'>
                    <select className='btn mr-2' onChange={handleChange('category')}>
                        <option value='All'>Categoria</option>
                            {/* method for implement the categories*/}
                            {categories.map((c,i)=>(
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}

                    </select>
                </div> 
                <input type='search' 
                className='form-control' 
                onChange={handleChange('search')}
                placeholder="Busqueda por Nombre"
            />
             </div>
             <div className='btn input-group-appened' style={{border:'none'}}>
                     <button className='input-group-text' >Busqueda</button>
                             
             </div>
         </span>
        </form>
    )
    
}





 return (
     <div className='row'>
         {/* <h2> Search bar {JSON.stringify(categories)}</h2> */}
         <div className='container mb-3'>
            {searchForm()}
            {/* <--remember this are the results */}
            {/* {JSON.stringify(results)} */}
            <div className='container-fluid mb-3'>
                {searchedProducts(results)}
            </div>
           
         </div>
     </div>
 )



}

export default Search