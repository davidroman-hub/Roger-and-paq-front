import React, {useEffect,useState} from 'react';

const Checkout = ({product}) => {
    // method for getvthe total amount

    const getTotal = () => {
        return product.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
        },0)
    }


    return (

    // <div>{JSON.stringify(product)}</div>
    <h2>Total: ${getTotal()}</h2>
    
    )

}

export default Checkout