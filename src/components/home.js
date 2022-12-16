import Button from "./button"
import Icons from "./icons";
import Card from "./hcard";
import SecHome from "./sec_home";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import img1 from "../images/124.svg";
import img2 from "../images/409.svg";
import img3 from "../images/435.svg";


class Home extends Component {

  render() {
    return (
        <>
            {/* HOME */}
            <SecHome/>

            {/* CARD */}
            <div className="sec-2">
                <div className="container">
                    <div className="col" >
                        <Card img={img1} title="1024 LOVET" info_1="Collection of 1024 NFTs of generative art on Polygon. 
                            The project started in December 2021 intending to bring a unique NFT ecosystem to crypto-space. 
                            Custom code written in Python has been used to produce the entire collection. 
                            The idea is to achieve a simple but impressive result, so the most basic geometric shapes have been used: 
                            circles, lines and triangles. The images are SVG files, which means they can be enlarged infinitely. 
                            Nothing better than our slogan can further describe the artwork." info_2="The style is unique" buttonText="MINT NOW" link="/mint"/>
                        <Card img={img2} title="ART GALLERY" info_1="A huge 3D exhibition space for your NFTs." info_2="unique style" buttonText="EXPLORE" target={"_blank"} link="/artgallery" />
                        <Card img={img3} title="MARKET PLACE" info_1="The first decentralized market place on Polygon mainnet" info_2="Coming soon" buttonText="TRADE NOW" link="/marketplace"/>
                    </div>
                </div>
            </div>
        </>

    );
  }
}

export default Home;


