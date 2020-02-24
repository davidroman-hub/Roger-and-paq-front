import React, {useEffect,useState} from 'react';
import { isAuth } from '../auth/index'
import { Link } from 'react-router-dom'
import { getBraintreeClientToken } from './apiCore'

const Checkout = ({product}) => {
    
//State to take the token from braintree
const [data, setData] = useState({
    success:false,
    clientToken:null,
    error:'',
    instance:{},
    address:''
})

// if the user is Auth

const userId = isAuth() && isAuth().user._id
const token = isAuth() && isAuth().token

// get teh token method

const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(
        data => { if (data.error){
            setData({...data, error:data.error})
            }
            else {
                setData({...data,clientToken:data.clientToken})
            }
        }
    )
}
useEffect(()=> {
    getToken(userId, token)
},[])

    


    // method for get the total amount

    const getTotal = () => {
        return product.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
        },0)
    };

    const showCheckout = () => {
        return isAuth() ? (
            <button className="btn btn-success">Pagar</button>
        ) :(
            <Link to="/signin">
                <button className="btn btn-primary">
                    inicia sesión para pagar
                </button>
            </Link>
        )
    }


    return (

    // <div>{JSON.stringify(product)}</div>
    <div>
        <h2>Total: ${getTotal()}</h2>
        {showCheckout()}
        
    </div>
  
    
    
    )

}

export default Checkout