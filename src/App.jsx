import React from "react";
import Topbar from "./components/topbar/Topbar"
import Intro from "./components/intro/Intro"
import Portolio from "./components/portfolio/Portfolio"
import Works from "./components/works/Works"
import Contacs from "./components/contacs/Contacs"
import "./app.scss"
import {useState} from "react"
import Menu from "./components/menu/Menu";

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [workIndex, setWorkindex] = useState(0)

  return (
    
    <div className="app">
        <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <div className="sections">
          <Intro />
          <Portolio setWorkindex={setWorkindex} />
          <Works workIndex={workIndex} />
          <Contacs />
        </div>
    </div>
  );
}

export default App;
