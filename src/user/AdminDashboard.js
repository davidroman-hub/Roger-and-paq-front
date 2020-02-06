import React from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'

const AdminDashboard= () => { 

        const { user : {_id, name, email, role}} = isAuth()


        const adminLinks = () => { 
            return (
                <div className='card'>
                    <h4 className='card-header'>Enlaces de Administrador</h4>
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            <Link className='nav-link' to='/create/categories'>Crear Categorias</Link>
                        </li>
                        <li className='list-group-item'>
                            <Link className='nav-link' to='/create/product'>Crear un Producto</Link>
                        </li>
                    </ul>    
                </div>
            )
        };

        const adminInfo = () => {
            return(
                  <div className=' card mb-5'>
                  <h3 className='card-header'>Informacion del Administrador</h3>
                  <ul className='list-group'>
                      <li className='list-group-item'>
                          {name}
                      </li>
                      <li className='list-group-item'>
                          {email}
                      </li>
                      <li className='list-group-item'>
                          {role === 1 ? 'admin' : 'Registered User'} 
                      </li>
                  </ul>
              </div>
              )
          } 


        return(
                <Layout title='Dashboard' description={`G' Day ${name}!`} className='container-fluid' >

                <div className='row'>
                    {/* <div className ='col-9'>
                        {userLinks()}
                    </div> */}
                    <div className='col-9'>
                        {adminLinks()}<br/>
                        {adminInfo()}
        
                    </div>
                </div>
        
        
                </Layout>

            )


}