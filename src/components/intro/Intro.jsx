import React, {useEffect, useRef} from "react";
import "./intro.scss";
import { init } from "ityped";
import man from "../intro/man.png"
import down from "../intro/down.png"

export default function Intro() {
  const textRef = useRef()

  useEffect(()=>{
    init(textRef.current, { 
      showCursor: true,
      backDelay: 1500,
      strings: ['Designer', 'Yeah!' ] })
  }, [])

  return (
    <div className="intro" id="intro">
      <div className="left">
        <div className="imageContainer">
          <img src={man} alt="" />
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <h1>Hi there, I'm</h1>
          <h2>Francesco</h2>
          <h3>
            Freelans <span ref={textRef}></span>
          </h3>
        </div>
        <a href="#portfolio">
          <img src={down} alt="" />
        </a>
      </div>
    </div>
  );
}
