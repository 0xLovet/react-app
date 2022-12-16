import Button from "./button"
import Icons from "./icons";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class SecHome extends Component {

    render() {
      return (
          <>
              {/* HOME */}
              <div className="home">

                <div className="disk">
                    <h1 className="title">FUCK IT <br/> I DONT CARE <br/>  I LOVE IT </h1>
                </div>

                <div className="leftside"></div>

                <div className="rightside text-center">
                    <div className="textinfo">
                        <h2 className="text-1">FREE ONLY FOR</h2>
                        <h3 className="text-1">4h : 56m : 5s</h3>
                    </div>
                    <Link className="my-btn" to="/mint">MINT NOW</Link>
                    <Icons/>
                </div>      
                     
              </div>
              </>

);
}
}

export default SecHome;