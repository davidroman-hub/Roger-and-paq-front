import React from 'react';
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'


const Card = ({product}) => {
    return (
        <div className='col-4 mb-3'>
            <div className='card'>
                <div className='card-header'>{product.name}</div>
                <div className='card-body'>
                    <p>{product.description.substring(0,100)}</p>
                    <ShowImage item={product} url='product'/>
                    <p>${product.price}</p>
                    <Link to={`/product/${product._id}`}>
                    <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        Ver más
                    </button>
                    </Link>
                    <button className='btn btn-outline-warning mb-2'>
                       Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card