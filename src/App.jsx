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

  return (
    
    <div className="app">
        <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <div className="sections">
          <Intro />
          <Portolio />
          <Works />
          <Contacs />
        </div>
    </div>
  );
}

export default App;
