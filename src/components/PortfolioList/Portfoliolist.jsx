import React from 'react'
import "./portfoliolist.scss"

export default function Portfoliolist({title, id, selected, setSelected}) {
  const pressed = () =>{
    setSelected(id)
    /* console.log("premo" + id) */
  }
  return (
    <li className={'portfoliolist ' + (selected==id && 'active')} onClick={pressed}>
      {title}
    </li>
  )
}
