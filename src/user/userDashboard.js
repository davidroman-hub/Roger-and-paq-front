import React, {useEffect,useState} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import Profile from './Profile'
import {getPurchaseHistory} from './apiUser'
import {listOrders} from '../admin/apiAdmin'
import moment from 'moment'


const Dashboard = () => {

    /// orders ///

    const [orders, setOrders] = useState([])
    const {user} = isAuth

    const loadOrders =() => {
        listOrders(_id, token).then( data => {
            if (data.error){
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }


    const [history, setHistory] = useState([])//<--- for the purchase history

    const {user:{_id, name, email, role}} = isAuth ()
    const token = isAuth ().token

    const init = (userId,token) => {
        getPurchaseHistory(userId,token).then(
            data => {
                if (data.error){
                    console.log(data.error)
                } else {
                    setHistory(data)
                }
            }
        )
    } 

    useEffect(()=>{
        init(_id, token);
        loadOrders()
    },[])




    const userLinks = () => {
        return(
            <div className='card'>
                <h4 className='card-header'> Usuario</h4>
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            <Link className='nav-link' to='/cart'>Mi Carrito</Link>
                        </li>
                        <li className='list-group-item'>
                            <Link className='nav-link' to={`/profile/${_id}`}>Actualizar mi información</Link>
                        </li>
                    </ul>
            </div>
        )
    }


    const userInfo = () => {
        return(
            <div className=' card mb-5'>
            <h3 className='card-header'>Información del Usuario</h3>
            <ul className='list-group'>
                <li className='list-group-item'>
                    
                    {name}
                </li>
                <li className='list-group-item'>
                    {email}
                </li>
                <li className='list-group-item'>
                    {role === 1 ? 'admin' : ' Usuario Registrado'}
                </li>
            </ul>
        </div> 
        )
    }

    const purchaseInfo = (history) => {
        return(
            <div className='card mb-5'>
            <h3 className='card-header'>Historial de mis Compras</h3> 
            <ul className='list-group'>
              <li className='list-group-item'>
                 {/* {JSON.stringify(history)} */}
                 {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <br/>
                                                <h6>Nombre del Producto: {p.name}</h6>
                                                <h6>Cantidad del Producto: {p.count}</h6>
                                                <h6>Precio: ${p.price}</h6>
                                                <h6>
                                                    comprado el dia:{" "}
                                                    {h.createdAt}                                                    
                                                </h6>
                                                <h6>Id transaccion:{h.transaction_id}</h6>
                                                <h6>Id orden:{h._id}</h6>
                                                <br/>
                                                <h6 style={{color: 'orange'}}>Estatus de la orden:{h.status}</h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                 
              </li>
           </ul>
      </div>
        )
    }

   
    return (

        <Layout title='Dashboard' description={`Buen Dia ${name}`} className='container-fluid' >
        
        <div className='col-9'>
            {userLinks()}<br/>
            {userInfo()}
            {purchaseInfo(history)}

        </div>    


    
           
        </Layout>
      
    
    )

}


export default Dashboard