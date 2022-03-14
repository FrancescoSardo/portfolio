import React from 'react'
import "./topbar.scss"
/* import PersonIcon from '@mui/icons-material/Person'; */
import {Person, Mail} from '@mui/icons-material';


export default function Topbar( {menuOpen , setMenuOpen} ) {
  console.log(menuOpen)
  return (
    <div className={"topbar " +(menuOpen && 'active')}>
      <div className='wrapper'>
            <div className="left">
              <a href="#intro" className="logo">Francesco Sardo {menuOpen}</a>
              <div className="itemcontainer">
                <Person className='icon' />
                <span> +39 3926552736</span>
              </div>
              <div className="itemcontainer">
                <Mail className='icon'/>
                <span>francescosardo91@gmail.it</span>
              </div>
            </div>
            <div className="right">
             <div className="hamburger"  onClick={() => {setMenuOpen(!menuOpen)}}>
               <span className='line1'></span>
               <span className='line2'></span>
               <span className='line3'></span>
             </div>
            </div>
      </div>
    </div>
  )
}
