import React, {useEffect,useState} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import Profile from './Profile'
import {getPurchaseHistory} from './apiUser'



const Dashboard = () => {


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
        init(_id, token)
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
                 {JSON.stringify(history)}
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