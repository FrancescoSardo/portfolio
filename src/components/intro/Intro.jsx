import React, {useEffect, useRef} from "react";
import "./intro.scss";
import { init } from "ityped";

export default function Intro() {
  const textRef = useRef()

  useEffect(()=>{
    init(textRef.current, { 
      showCursor: false,
      backDelay: 1500,
      strings: ['Designer', 'Yeah!' ] })
  }, [])

  return (
    <div className="intro" id="intro">
      <div className="left">
        <div className="imageContainer">
          <img src="assets/man.png" alt="" />
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
          <img src="assets/down.png" alt="" />
        </a>
      </div>
    </div>
  );
}
