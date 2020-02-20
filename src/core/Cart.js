import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from './Layout'
import {getCart} from './cardHelpers'
import Card from './Card'

const Cart = () => {

    // state for show the items
    const [item, setItem] =useState([])
    
    
useEffect(()=> {
        setItem(getCart)
    },[])

const showItem = () =>{
    return (
        <div>
           <h2> Tu Carrito tiene {`${item.length}`} Productos</h2>
            <hr/>
            {item.map((product,i)=>(
                <Card key={i} product={product}/>
            ))}
        </div>
    )
}

const notItemMessage = () => (
    <h2> Tu carrito esta vacio. <br/>
        <Link to='/shop'>Continua Comprando</Link>
    </h2>
)

return (
<Layout title="Carrito de compras"
        description="Gestiona tu carrito de compras. Agrega, remueve ó Continua comprando"
        className="container-fluid"
>
    <div className="row">
        <div className="col-6">
        {item.length > 0 ? showItem(item) : notItemMessage()}
        </div>
        <div className="col-6">
        <p> show checkout options...</p>
        </div>
    </div>
</Layout>
)

}
export default Cart