import React, {useEffect,useState} from 'react';
import { isAuth } from '../auth/index'
import { Link } from 'react-router-dom'
import { getBraintreeClientToken } from './apiCore'
import DropIn from 'braintree-web-drop-in-react'




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

const showDropIn = () => {
    return (
        // onBlur is used when its an error on our pay method ,
        // when you start to put something will disapear
        <div onBlur={ ()=> setData({...data, error:""})}>
            {data.clientToken !== null && product.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization:data.clientToken
                    }} onInstance = {instance => (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-success">Pagar</button>
                </div>
            ) : null}
        </div>
    )
}

     // Buy method

     const buy = () => { 

        // send the nonce to your server
        //nonce = data.instance.requestPaymentMethod()

        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(
            data => {
                console.log(data)
                nonce = data.nonce
                 // once you have nonce (card type, card number , etc..) send nonce as "paymentMethodNonce " to the backend
                // and also total to be charged
                console.log('send nonce and total process:', nonce, getTotal(product))
            }
        )
        .catch( error => {
            console.log('dropin error', error)
            setData({...data, error: error.message})
        })

    }


    // method for get the total amount

    const getTotal = () => {
        return product.reduce((currentValue, nextValue) =>{
            return currentValue + nextValue.count * nextValue.price
        },0)
    };

    const showCheckout = () => {
        return isAuth() ? (

        <div>{showDropIn()}</div>
        ) :(
            <Link to="/signin">
                <button className="btn btn-primary">
                    inicia sesión para pagar
                </button>
            </Link>
        )
    }

    const showError = error => {
        return (
        <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>{error}</div>
        )
    }
   
   



    return (

    // <div>{JSON.stringify(product)}</div>
    <div>
        <h2>Total: ${getTotal()}</h2>
        {showError(data.error)}
        {showCheckout()}
        
    </div>
  
    
    
    )

}

export default Checkout