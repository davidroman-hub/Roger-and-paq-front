import React from 'react'
import Layout from '../core/Layout'




const Dashboard = () => {
   
    return (

        <Layout title='Dashboard' description=' User Dashboard' className='container' >
            <div className=' card mb-5'>
                <h3 className='card-header'>Información del Usuario</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        name
                    </li>
                    <li className='list-group-item'>
                        email
                    </li>
                    <li className='list-group-item'>
                        role
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