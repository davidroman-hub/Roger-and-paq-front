// import React from 'react';
// import {API} from '../Config'

// const ShowImage = ({item, url}) => (
//     <div className='product-img'>
//         <img src={`${API}/${url}/photo/${item._id}`}
//         alt={item.name}
//         style={{maxHeight:'100%', maxWidth:'100%'}}/>
//     </div>
// )

// export default ShowImage


import React from 'react'
import {API} from '../Config'

const ShowImage = ({item, url}) =>(
    <div className='product-img'>
        <img src={`${API}/${url}/photo/${item._id}`}
         alt={item.name} 
         style={{maxHeight:'100%', maxWidth:'100%'}}/>    
    </div>
)

export default ShowImage 