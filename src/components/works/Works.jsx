import React, {useEffect, useState} from "react";
import "./works.scss";
import { dataAll, DataMobile } from "../../data/PostfolioAssets";
import intro from "../../data/assets/PhotoApp/intro.png"

export default function Works({workIndex}) {

  const data = dataAll;
  
  
  useEffect(()=>{
    
    scroolTo(workIndex)

  },[workIndex]);
  

  const [oggetto, setOggetto] = useState()
  const [currentSlider, setcurrentSlider] = useState(0)

  const handelclick = (way) => {
    
    way==="left" 
    ? setcurrentSlider(currentSlider > 0 ? currentSlider - 1: 2 ) 
    : setcurrentSlider(currentSlider < data.length-1  ? currentSlider+1 : 0);
    
  }
  
  const stileSlide = {
    transform: `translateX(-${currentSlider * 100}vw)`
  } 
  
  const scroolTo = (i)=>{

    let t = null;
    data.map((item, index)=>{
     /*  console.log("item id " ,item.id)
      console.log("index ", index) */
      console.log(item.id == i)
      if(item.id == i){
        t = index 
      }
    })
    console.log(t)
    setcurrentSlider(t)
    /* console.log("current slider = " + currentSlider) */
  }
  
  return (

    <div className="works" id="works">
      <div className="slider" style={stileSlide}>
        {data.map(d=>(
          
          <div className="container">
          <div className="item" id="word_id" >
            <div className="left" >
              
                <div className="imgcontainer">
                  <img src={d.img}></img>
                </div>
                
              
            </div>
            <div className="right">
            <h2>{d.title}</h2>
                <p>{d.dr}</p>
                <span>Projecs</span>
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
