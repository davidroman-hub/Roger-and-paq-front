import React,{useEffect,useState} from 'react';
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem} from './cardHelpers'
import './Styles.scss'

const Card = ({product , showViewProductButton = true}) => {

//State for the cvart redirection

const [redirect, setRedirect]= useState(false)

//We import the funtion from cart helpers and we gonna execute 

const addToCart = () => {
    addItem(product, setRedirect(true))
} 

const shouldRedirect = redirect =>{
    if(redirect){
        return <Redirect to='/cart'/>
    }
}

// when we have this we have to put the funtion on the button add to cart..



// for take off the product button from the individual card we have to restructure
// the code, made a funtion for only show at the shop and at the home but not in the product view

//Function:

const showViewButton = (showViewProductButton) => {
    return (
        showViewProductButton && (
            <Link to={`/product/${product._id}`}>
            <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                Ver más
            </button>
            </Link>
        )
    )
}

const showAddToCartButton = () => {

    return (            // here
        <button onClick={addToCart} className='btn btn-outline-warning mb-2'>
        Agregar al Carrito
     </button>
    )
}

const showStock = (quantity) => {

    return quantity > 0 ? <span className='badge badge-primary badge-pill'>En stock</span> 
    : 

    <span className='badge badge-primary badge-pill'> Sin Stock</span>

}



    return (
        // <div className='col-4 mb-3'>
            <div className='card' style={{'background':'#F7F7F7F7', 'border':'none'}}>
                <div className='card-header name'>{product.name}</div>
                <div className='card-body'>
                    {shouldRedirect(redirect)} 
                    <ShowImage item={product} url='product'/>
                    <p className='black-10'>${product.price}</p>
                    <p className='black-9'>{product.category &&
                    product.category.name}</p>
                    <p>{product.description.substring(0,20)}</p>
                    <p className='black-8'> Agregado el {moment(product.createdAt).fromNow()}</p>
                
                    {/* <Link to={`/product/${product._id}`}>
                    <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        Ver más
                    </button>
                    </Link> */}
                    {showStock(product.quantity)}
                    <br/>
                    {showViewButton(showViewProductButton)}
                    {showAddToCartButton()}
                  
                </div>
            </div>
        // </div>
    )
}

export default Card