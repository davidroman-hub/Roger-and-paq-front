
import React,{useState} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'

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
};

const newCategoryForm = () => (

    <form onSubmit = {clickSubmit}>
        <div className='form-group'>
            <label className='text-muted'>
                Nombre
            </label>
            <input type='text'
            className='form-control'
            onChange={handleChange}
            value={name}
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
            </div>
        </div>



    </Layout>

        )
}

export default AddCategory