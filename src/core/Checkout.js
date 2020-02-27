import React, {useEffect,useState} from 'react';
import { isAuth } from '../auth/index'
import { Link } from 'react-router-dom'
import { getBraintreeClientToken , processPayment} from './apiCore'
import DropIn from 'braintree-web-drop-in-react'
import { emptyCart } from './cardHelpers'
import {createOrder} from './apiCore'





const Checkout = ({product}) => {
    

    
//State to take the token from braintree
const [data, setData] = useState({
    loading:false,
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
                setData({clientToken:data.clientToken})
            }
        }
    )
}
useEffect(()=> {
    getToken(userId, token)
},[])

const handleAddress =  event => {
    setData({...data, address:event.target.value})
}

const showDropIn = () => {
    return (
        // onBlur is used when its an error on our pay method ,
        // when you start to put something will disapear
        <div onBlur={ ()=> setData({...data, error:""})}>
            {data.clientToken !== null && product.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className='text-muted'>
                            Direccion de Envio
                        </label>
                        <textarea
                        onChange={handleAddress}
                        className='form-control'
                        value={data.address}
                        placeholder='Escribe tu direccion de envio aqui C.P, calle, Ref, etc..'/>
                    </div>


                    <DropIn options={{
                        authorization:data.clientToken,
                        paypal:{
                            flow:"vault"
                        }
                    }} onInstance = {instance => (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-success btn-block">Pagar</button>
                </div>
            ) : null}
        </div>
    )
}

//delivery address

let deliveryAddress = data.address

     // Buy method

     const buy = () => { 
         setData({loading: true})
        // send the nonce to your server
        //nonce = data.instance.requestPaymentMethod()
        
        let nonce;
        let getNonce = data.instance
        .requestPaymentMethod()
        .then(
            data => {
                console.log(data);
                nonce = data.nonce;
                 // once you have nonce (card type, card number , etc..) send nonce as "paymentMethodNonce " to the backend
                // and also total to be charged
               // console.log('send nonce and total process:', nonce, getTotal(product))
            
            //    const paymentData = {
            //     paymentMethodNonce:nonce,
            //     amount:getTotal(product)
            // }
            const paymentData = { 
                paymentMethodNonce: nonce,
                amount: getTotal(product)
            }

            processPayment(userId,token, paymentData)
            .then(response => {
                console.log(response)
               
                ///Create order///
                
                const createOrderData ={ 
                    products:product,
                    transaction_id:response.transaction_id,
                    amount:response.transaction.amount,
                    address:deliveryAddress
                }
                createOrder(userId, token,createOrderData)
               
               
                setData({...data,
                     success:response.success
                });
                emptyCart(()=>{
                    console.log('payment success and empyty cart');
                    //setData({loading:false});
                })

            })
            .catch(error => {
                console.log(error)
                setData({loading:false});
            })

            // Empty cart
            // create order            
            })
            .catch( error => {
           // console.log('dropin error', error)
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
   
    const showSuccess = success => {
        return (
            <div className="alert alert-info" style={{display:success ? '':'none'}}>
                Gracias por tu pago!
            </div>
        )
    }
   
    const showLoading = (loading) => (
        loading && (
            <h3>Cargando...</h3>
        )
    )



    return (

    // <div>{JSON.stringify(product)}</div>
    <div>
        <h2>Total: ${getTotal()}</h2>
        {showLoading(data.loading)}
        {showSuccess(data.success)}
        {showError(data.error)}
        {showCheckout()}
        
    </div>
  
    
    
    )

}

// the history was made in the back end--

 export default Checkout

