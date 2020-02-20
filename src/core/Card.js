import React,{useEffect,useState} from 'react';
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem, updateItem } from './cardHelpers'
import './Styles.scss'



const Card = ({product ,
              showViewProductButton = true, 
              showAddToCartButton = true,
              cartUpdate = false  //<-dicrement increment the same product
            
            }) => {


//State for the cart redirection
const [redirect, setRedirect]= useState(false)

//State for increment or dicrement the quantity
const [count, setCount] = useState(product.count)


//We import the funtion from cart helpers and we gonna execute 

const addToCart = () => {
    addItem(product, setRedirect(true))
} 

const shouldRedirect = redirect =>{
    if(redirect){
        return <Redirect to='/cart'/>
    }
}


const showAddToCart = (showAddToCartButton) => {
    return showAddToCartButton && (
        <button onClick={addToCart} className='btn btn-outline-warning mt-2 mb-2'>
            Agregar al carrito
        </button>
    )
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

// const showAddToCartButton = () => {

//     return (            // here
//         <button onClick={addToCart} className='btn btn-outline-warning mb-2'>
//         Agregar al Carrito
//      </button>
//     )
// }

// method for show in a button if exist stock or not

const showStock = (quantity) => {

    return quantity > 0 ? <span className='badge badge-primary badge-pill'>En stock</span> 
    : 

    <span className='badge badge-primary badge-pill'> Sin Stock</span>

}


// handleChange fot change the quantyty of the products
//we need to create another method in card helpers called update and use at the final

const handleChange = productId => event => {
    setCount (event.target.value < 1 ? 1 : event.target.value )
    if(event.target.value >= 1) {
        updateItem(productId, event.target.value)
    }
}

// method for show if we want to add more quantity for the same product 


const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && (
    <div> 
        <div className='input-group mb-3'>
            <div className='input-group-prepend'>
                <span className='input-group-text'>
                    Cantidad (Máx 3)
                </span>
                {/* we need to know who it will be the product to we need to incr/dicr thats whywe use Id*/}
            </div>
            {/* <select onChange={handleChange(product._id)}>
                <option value={count}>1</option>
                <option value={count}>2</option> 
                <option value={count}>3</option> 
            </select> */}

             <input type="number"
             className="form-contro"
              max='3'
              value={count} 
              onChange={handleChange(product._id)} />
        </div>
    </div>
    )
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
                    <p className='black-8'> Agregado {moment(product.createdAt).fromNow()}</p>
                
                    {/* <Link to={`/product/${product._id}`}>
                    <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        Ver más
                    </button>
                    </Link> */}
                    {showStock(product.quantity)}
                    <br/>
                    {showViewButton(showViewProductButton)}
                    {showAddToCart(showAddToCartButton)}
                    {showCartUpdateOptions(cartUpdate)}
                  
                </div>
            </div>
        // </div>
    )
}

export default Card