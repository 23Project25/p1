import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
export default function App(){
    return(
        <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} /> 
    <nav>
                <Link to="/">Home</Link> 
                <Link to="/about">About</Link>
    </nav>
      </Routes>
        </BrowserRouter>
    );
}
