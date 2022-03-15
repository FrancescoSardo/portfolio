import React from 'react'
import "./portfoliolist.scss"

export default function Portfoliolist({title, id, selected, setSelected}) {
  return (
    <li className={'portfoliolist ' + (selected==id && 'active')} onClick={() => setSelected(id) }>
      {title}
    </li>
  )
}
