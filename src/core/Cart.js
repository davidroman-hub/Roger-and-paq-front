import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Layout from './Layout'
import {getCart} from './cardHelpers'
import Card from './Card'

const Cart = () => {

    // state for show the items
    const [item, setItem] =useState([])
    
    //State for fix the loop // remove items 1.-
    const [run, setRun] = useState(false)



useEffect(()=> {
        setItem(getCart)
    },[run])

const showItem = () =>{
    return (
        <div>
           <h2> Tu Carrito tiene {`${item.length}`} Productos</h2>
            <hr/>
            {item.map((product,i)=>(
                <Card key={i}
                 product={product} 
                 showAddToCartButton={false}
                 cartUpdate={true}
                 showRemoveProductButton={true}
                // we need to pas as props ru and setRun 2.-
                setRun={setRun}
                run={run}
                />
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