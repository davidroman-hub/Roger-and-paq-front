
import React,{useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuth} from '../auth/index'
import {Link} from 'react-router-dom'
import {read, update, updateUser} from './apiUser'

const Profile = ({match}) => { 

const [values, setValues] = useState ({
    name:'',
    email:'',
    password:'',
    error:false,
    success:false
})

const {name,email,password,error,success} =values

const init = (userId) => {
    console.log(userId)
}

useEffect(() => {
    init(match.params.userId)
})

return (
    // <h1> User profile</h1>

    <Layout title='Perfil del usuario'
    description='Actualiza tu Informacion'
    className='container-fluid'
    >
        <h2>Actualiza usuario</h2>

    </Layout>
    )

}

export default Profile