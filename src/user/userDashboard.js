import React from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'




const Dashboard = () => {

    const {user:{_id, name, email, role}} = isAuth ()
   
    return (

        <Layout title='Dashboard' description=' User Dashboard' className='container' >
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


            ...
            <div className='card mb-5'>
                  <h3 className='card-header'>Historial de mis Compras</h3> 
                  <ul className='list-group'>
                    <li className='list-group-item'>
                        history
                    </li>
                 </ul>
            </div>
        </Layout>
      
    
    )

}


export default Dashboard