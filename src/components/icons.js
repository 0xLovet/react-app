import React, { Component } from 'react';
import instagram from "../images/instagram.svg";
import twitter from "../images/twitter.svg";
import youtube from "../images/youtube.svg";
import medium from "../images/medium.svg";
import opensea from "../images/opensea.svg";
import polygon from "../images/polygon-black.svg";


class Icons extends Component{
    render() {
        return(
        <>            
        <div className="social-icons">
            <a href="https://opensea.io/collection/0xlovet" target="_blank" rel="noreferrer">
            <img className="social-icons-img" src={opensea} alt="nft opensea, lovet opensea"></img>
            </a>
            <a href="https://www.instagram.com/0xlovet/" target="_blank" rel="noreferrer">
            <img className="social-icons-img" src={instagram} alt="nft instagram, lovet instagram"></img> 
            </a>
            <a href="https://twitter.com/0xLovet" target="_blank" rel="noreferrer">
            <img className="social-icons-img" src={twitter} alt="nft twitter, crypto twitter, lovet twitter"></img>  
            </a>
            <a href="https://medium.com/@0xLovet" target="_blank" rel="noreferrer">
            <img className="social-icons-img" src={medium} alt="nft medium, crypto medium, lovet medium"></img>  
            </a>
            <a href="https://www.youtube.com/channel/UCW4mreBBaTuFjaF56o7oJ1A" target="_blank" rel="noreferrer">
            <img className="social-icons-img" src={youtube} alt="nft youtube, crypto youtube, lovet youtube"></img>  
            </a>
        </div>
        <div className="social-icons"> 
            <a href="https://polygonscan.com/token/0x5fb74c1597d43db0b326e27f8acd2270f80ec2e0" target="_blank" rel="noreferrer">
            <img className="social-icons-img icon-polygon" src={polygon} alt="nft smart contract, lovet token, polygon"></img>  
            </a>
        </div>
        </>
        );
    }

}
export default Icons;