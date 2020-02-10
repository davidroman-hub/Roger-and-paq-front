
import React,{useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
//import {Link} from 'react-router-dom'
import { createProduct, getCategories } from './apiAdmin'

const AddProduct = () => {

//State

const [values, setValues] = useState({//<-- have to be an object because we gonna send props

    name:'',
    description:'',
    price:'',
    categories:[], //<-- we gonna put the categories from the backend
    category:'',
    shipping:'',
    quantity:'',
    photo:'',
    loading:false,
    error:'',
    createdProduct:'',
    redirectToProfile:false,
    formData:''
})


// destructure of the same state:

const {

    name,
    description,
    price,
    categories, //<-- we gonna put the categories from the backend
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData // <--  we gonna send this to the backend

} = values;

// load categories and set formData


const init = () => {
    getCategories().then( data => {
        if(data.error){
            setValues({...values, error: data.error})
        } else{
            setValues({...values, categories: data, formData : new FormData()})
        }
    })
}


useEffect(() => { 
    // setValues({...values, formData: new FormData()}); //<-- thats why we used here
    init()
}, [])


const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0]: event.target.value;
    formData.set(name, value);//<-- first we gonna take the fisrt value 'name' and after we gonna take the other values
    setValues({...values, [name]: value})
}

const clickSubmit= (event) => { 
    event.preventDefault()
    setValues({...values, error:'', loading:true})
    createProduct(user._id, token, formData)
    .then(data => {
        if(data.error){
            setValues({...values, error:data.error})
        }else{
            setValues({
                ...values,
                name:'',//<-- this is the name
                description:'',
                photo:'',
                price:'',
                quantity:'',
                loading:false,
                createProduct:data.name // we need the name
            })
        }
    })
}



const newPostForm = () => {
    
    return(
    
    
    <form className='product-form' onSubmit={clickSubmit}>
        <h4>Agrega una foto</h4>
        <div className='container'>
            <label className='btn btn-secondary'>
                <input
                    onChange={handleChange('photo')}
                    type='file'
                    name='photo'
                    accept='image/*'
                />
            </label>
        </div>

        <form className='mb-3' onSubmit={clickSubmit}>



<div className='form-group'>
    <label className='text-muted'>  </label>
        <input 
            placeholder='Nombre del producto'
            onChange={handleChange('name')} 
            type='text' 
            className='form-control' 
            value={name} />
</div>




<div className='form-group'>
    <label className='text-muted'></label>
        <textarea 
            placeholder='descripcion del producto'
            onChange={handleChange('description')}  
            className='form-control' 
            value={description} />
</div>

<div className='form-group'>
    <label className='text-muted'> Precio </label>
        <input 
            onChange={handleChange('price')} 
            type='number' 
            className='form-control' 
            value={price} />
</div>

<div className='form-group'>
    <label className='text-muted'> Categoria </label>
        <select 
            onChange={handleChange('category')} 
            className='form-control' 
            >\
            {/* cambiamos las opciones para encontrar categorias */}
             <option >Elija una por favor</option> 
            {categories && categories.map((c, i) => 
            (<option key={i} 
            value={c._id}> {c.name} </option>))}              
        </select>
</div>


<div className='form-group'>
    <label className='text-muted'>envio</label>
        <select 
            onChange={handleChange('shipping')} 
            className='form-control' 
            >
             <option value='0'>Por favor selecciona</option>
             <option value='0'>No</option>
             <option value='1'>Si</option>      
        </select>
</div>


<div className='form-group'>
    <label className='text-muted'>Cantidad?</label>
        <input 
            onChange={handleChange('quantity')} 
            type='number' 
            className='form-control' 
            value={quantity} />
</div>

<button > Create Product </button>


</form>



    </form>










    )
}




//destructure 

const {user, token} = isAuth()

return(

    <Layout title='Agregar nuevo producto'
    description={`Buen dia ${user.name}!, listo para crear un nuevo producto?`}
    >
        <div className='row'>
            <div className='col-md-8 offset-md-2'>
              { newPostForm()}
            </div>
        </div>

    </Layout>

        )
    }


    export default AddProduct