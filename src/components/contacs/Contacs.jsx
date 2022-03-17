import React from 'react'
import "./contacs.scss"
import imge from "../../assets/shake.svg"


export default function Contacs() {
  return (
    <div className='contacs' id='contacs'>
      <div className="left">
        <img src={imge} alt="" />
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
