import React from 'react'
import "./contacs.scss"
import imge from "../../assets/shake.svg"


export default function Contacs() {



  return (
    <div className='contacs' id='contacs'>
      <div className="left">
        <div className="imagewrapper"   style={{ 
          backgroundImage: `url(${imge})`
        }} ></div>

        <div className='info' >
            <h2>Insta</h2>
            <h2>facebook</h2>
            <h2>Discord</h2>
        </div>
       
      </div>
      <div className="right">
        <h2>Contacs</h2>
        <form action="">
          <input type="text" placeholder='email' />
          <textarea /* name="" id="" cols="30" rows="10" */ placeholder='message'></textarea>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}
