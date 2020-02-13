import React, {useState,useEffect,Fragment} from 'react'

// we need props of prices.js

const RadioBox = ({prices}) => {

    // state 
    const [value, setValues] = useState(0)
    const handleChange = () =>{
        //
    }

    return prices.map((p,i) => (
        <div key={i}>
            <input
            onChange={handleChange}
            value={`${p._id}`}
            type='radio'
            className='mr-2 ml-4'
            />

        <label className='form-check-label'>{p.name}</label>
        </div>
    ))


     // return (

    //     // <Fragment>
    //     //     {JSON.stringify(prices)}
    //     //     <input type="radio" className='mr-2 ml-4'/>
    //     //     <label className='form-check-label'>Name</label>
    //     // </Fragment>

    // )


}
export default RadioBox