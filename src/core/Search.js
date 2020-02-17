import React, { useState,useEffect} from 'react'
import {getCategories} from './apiCore'
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





 return (
     <div >
         <h2> Search bar {JSON.stringify(categories)}</h2>
     </div>
 )



}

export default Search