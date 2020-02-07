
import React,{useState} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import{createCategory} from './apiAdmin'






const AddCategory = () => { 

//State

const [name, setName] = useState('')
const [error, setError] = useState(false)
const [success, setSuccess ] = useState(false)

// destructure user and info (token) from localstorage

const {user, token} = isAuth()

//we need to create 2 method, for handleChange and for clickSubmit

const handleChange = (e) => {
    setError('')
    setName(e.target.value)
}

const clickSubmit = (e) => { 
    e.preventDefault()
    setError('')
    setSuccess(false)
     
    
//make request to API to create category
createCategory(user._id, token,{name})
.then( data => {
    if(data.error){
        setError(true)
    } else {
        setError('')
        setSuccess(true)
        }
    })
};

// Method for Show error and success of the new category

const showSuccess = () => { 
    if(success){
        return<h3 className='text-success'>{name} Ha sido creado</h3>
    }
}

const showError = () => { 
    if(error){
        return<h3 className='text-danger'> La categoria debe ser unica! crea otra con nombre diferente</h3>
    }
}


// button for go back

const goBack= () => (
    <div className='mt-5'>
        <Link to='/admin/dashboard' className='text-warning'>Vuelve al inicio</Link>
    </div>
)



const newCategoryForm = () => (

    <form onSubmit = {clickSubmit}>
        <div className='form-group'>
            <label className='text-muted'>
                Name
            </label>
            <input type='text'
            className='form-control'
            onChange={handleChange}
            value={name}
            autoFocus
            required //<-- need to be something inside of the input
            />

        </div>

    <button >
        Crear una categoria!
    </button>


    </form>
);

return (

    <Layout title="Agregar una nueva categoria"
    description={`Buen dia ${user.name}, listos para agregar una nueva categoria?`}
    >
        <div className='row'>
            <div className='col-md-8 offset-md-2' >
                {newCategoryForm()}
                {showError()}
                {showSuccess()}
                {goBack()}
            </div>
        </div>



    </Layout>

        )
}

export default AddCategory