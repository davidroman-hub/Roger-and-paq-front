import React, { useState,useEffect} from 'react'
import {getCategories, list} from './apiCore'
import Card from "./Card"

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


// second step is create the searchSubmit

const handleChange = () => {
    //
}

// second step is create searchsubmit
const searchSubmit = () => {
    //
}


const searchForm = () => { 

    return(
        <form onSubmit={searchSubmit} className=''>
         <span className='input-group-text'>
             <div className='input-group input-group-lg'>
                <div className='input-group-prepend'>
                    <select className='btn mr-2' onChange={handleChange('category')}>
                        <option value='All'>Selecciona una Categoria</option>
                            {/* method for implement the categories*/}
                            {categories.map((c,i)=>(
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}

                    </select>
                </div> 
                <input type='search' 
                className='form-control' 
                onChange={handleChange('search')}
                placeholder="Busqueda por Nombre"
            />
             </div>
         </span>
        </form>
    )
    
}





 return (
     <div className='row'>
         {/* <h2> Search bar {JSON.stringify(categories)}</h2> */}
         <div className='container'>
            {searchForm()}
         </div>
     </div>
 )



}

export default Search