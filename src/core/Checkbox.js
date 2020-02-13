import React, { useState,useEffect } from 'react'


// we need to get the props fo the categories for use it.
                //props of categories
const Checkbox = ({categories, handleFilters}) => {

// state for handle the categories, i mmean, when we cheked select the category.

const [checked, setChecked] = useState([])

//we need to check if the category its alredy selected and for that we use this function
const handleToggle = c => () => { 
    const currentCategoryId = checked.indexOf(c) //return the first index or
    // -1 and this will tell us if is alredy there
    const newCheckedCategoryId = [... checked] //<-- will gave us all the categories names on the state

    // if currently checked was not alredy in checked state >  push 
    //else pull // take of
   
    if(currentCategoryId === -1) {
        newCheckedCategoryId.push(c)
    } else {
        newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    //console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);

}



    return categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
            <input 
            onChange={handleToggle(c._id)}
            value={checked.indexOf(c._id === -1)}
            type='checkbox' 
            className='form-check-input'/>
            <label className='form-check-label'>{c.name}</label>
        </li>

    ))
}

export default Checkbox