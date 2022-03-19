import React, {useEffect, useState} from "react";
import "./works.scss";
import { dataAll } from "../../data/PostfolioAssets";
import intro from "../../data/assets/PhotoApp/intro.png"

export default function Works({workIndex}) {

  const data = dataAll;
  
  /* console.log(workIndex)
  useEffect(()=>{
    console.log(dataAll[workIndex])
    setOggetto(dataAll[workIndex])

  },[workIndex]); */
  

  const [oggetto, setOggetto] = useState()
  const [currentSlider, setcurrentSlider] = useState(0)

  const handelclick = (way) => {
    way==="left" ? setcurrentSlider(currentSlider > 0 ? currentSlider-1: 2 ) : 
    setcurrentSlider(currentSlider < dataAll.length-1  ? currentSlider+1 : 0);
    console.log(currentSlider)
  } 
  return (

    <div className="works" id="works">
      <div className="slider" style={{transform: `translateX(-${currentSlider * 100}vw)`}}>
        {data.map(d=>(
          <div className="container">
          
          <div className="item" id="word_id" >
            <div className="left" >
              <div className="leftcontainer">
                <div className="imgcontainer"></div>
                <h2>{d.title}</h2>
                <p>{d.dr}</p>
                <span>Projecs</span>
              </div>
            </div>
            <div className="right">

            </div>
          </div>
        </div>
        ))}

      </div>
      <img src={require('../../assets/arrow.png')} className="arrow left" alt="" onClick={()=> handelclick("left")} />
      <img src={require('../../assets/arrow.png')} className="arrow right" alt="" onClick={()=> handelclick("right")}/>
    </div>
  );
}
