import React, { useState, useEffect } from "react";
import "./portfolio.scss";
import ProgettoTest from "../portfolio/ProgettoTest.jpeg";
import Portfoliolist from "../PortfolioList/Portfoliolist";
import { dataAll, dataWebApp, DesktopApp, DataMobile } from "../../data/PostfolioAssets.js";

export default function Portfolio({setWorkindex}) {
  const [selected, setSelected] = useState("All");
  const [data, setData] = useState([]);

  useEffect(() => {
    switch (selected) {
      case "All":
        setData(dataAll);
        break;
      case "Web":
        setData(dataWebApp);
        break;
      case "Mobile":
        setData(DataMobile);
        break;
      case "Desktop":
        setData(DesktopApp);
        break;
      default:
        setData(dataAll);
    }
  }, [selected]);

  const lis = [
    {
      id: "All",
      title: "All",
    },
    {
      id: "Web",
      title: "web",
    },
    {
      id: "Mobile",
      title: "Mobile",
    },
    {
      id: "Desktop",
      title: "Desktop",
    },
  ];

  const pressed = () =>{
    /* setWorkindex(index) */
    
  }

  return (
    <div className="portfolio" id="portfolio">
      <h1>Portfolio</h1>
      <ul>
        {lis.map((item) => (
          <Portfoliolist
            title={item.title}
            id={item.id}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </ul>
      <div className="container">
        {data.map((item) => {
          /* console.log(data) */
          return (
            <React.Fragment>
              <div className="item" onClick={()=> {
                setWorkindex(item.id)
                console.log("working index " + item.id)
              }}>
                <img src={item.img}></img>
                <a href="#works">{item.title}</a>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
