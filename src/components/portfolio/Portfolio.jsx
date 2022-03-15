import React, {useState} from 'react'
import "./portfolio.scss"
import ProgettoTest from "../portfolio/ProgettoTest.jpeg"
import Portfoliolist from '../PortfolioList/Portfoliolist'

export default function Portfolio() {

  const [selected, setSelected] = useState("features");

  const lis = [
    {
      id: "features",
      title: "features"
    },
    {
      id: "web",
      title: "web app"
    },
    {
      id: "mobile" ,
      title: "Mobile App"
    },
    {
      id: "java",
      title: "java app"
    },
  ]
  return (
    <div className='portfolio' id='portfolio'>
      <h1>Portfolio</h1>

      <ul>
        {lis.map(item=> (
          <Portfoliolist title={item.title} id={item.id} selected={selected} setSelected={setSelected} />
        ))}

      </ul>
      <div className="container">
        <div className="item">
          <img src={ProgettoTest} alt="" />
          <h3>Chatting App</h3>
        </div>
        <div className="item">
          <img src={ProgettoTest} alt="" />
          <h3>Chatting App</h3>
        </div>
        <div className="item">
          <img src={ProgettoTest} alt="" />
          <h3>Chatting App</h3>
        </div>
        <div className="item">
          <img src={ProgettoTest} alt="" />
          <h3>Chatting App</h3>
        </div>
        <div className="item">
          <img src={ProgettoTest} alt="" />
          <h3>Chatting App</h3>
        </div>
        <div className="item">
          <img src={ProgettoTest} alt="" />
          <h3>Chatting App</h3>
        </div>
      </div>
      
      
    </div>
  )
}
