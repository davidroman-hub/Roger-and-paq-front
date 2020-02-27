
import React,{useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import { listOrders} from './apiAdmin'
import moment from 'moment'

const Orders = () => {

    const [orders, setOrders] = useState([])

    const{user,token} = isAuth()

    const loadOrders =() => {
        listOrders(user._id, token).then( data => {
            if (data.error){
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }

    useEffect(()=> {
        loadOrders()
    },[])

    // const noOrders = orders => {
    //     return orders.length < 1 ? <h2>No orders </h2> : null
    // };

    const showOrdersLength = () => {
        if(orders.length > 0 ){
            return(
            <h4 className="text-danger display-4">Total de Ordenes {orders.length}</h4>
            )
        } else {
            return <h1 className="text-danger"> No Hay ordenes</h1>
        }
    }

    const showOrdersDisplay = () => {
        
        return(

            <div className='row'>
            <div className='col-md-8 offset-md-2'>
            <div className='col-md-8 offset-md-2'>
              
                {/* {JSON.stringify(orders)}   */}
                {orders.map((o, oIndex) => {
                        return (
                            <div className='mt-5' 
                            key={oIndex} 
                            style={{borderBottom: "5px solid indigo"}}>
                                <h2 className='mb-5'>
                                    <span className="bg-primary">Order ID: {o._id}</span>
                                </h2>
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        {o.status}
                                    </li>
                                    <li className="list-group-item">
                                    Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Total: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        {/* Ordered by: {o.user.name} */}
                                    </li>
                                    <li className="list-group-item">
                                       Ordenado hace: {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                       Envio: {o.address}
                                    </li>
                                </ul>
                        <h3 className="mt-4 mb-4 font-italic"> Total products in the order:{o.products.length}</h3>
                            </div>
                        )
                })}
            </div>
            </div>
        </div>
        
        )
    }
        
    

    return (
        <Layout title='Orders' 
        description={`G' Day ${user.name}!, you can manage all the orders here`} 
        >

        <div className='row'>

            <div className='col-md-8 offset-md-2'>
                {/* {noOrders(orders)} */}
                {showOrdersLength()}
                { showOrdersDisplay()}

                {/* {JSON.stringify(orders)}   */}

            </div>
        </div>


        </Layout>
    )

}

export default Orders

