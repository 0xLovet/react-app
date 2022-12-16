import Navbar from "./navbar";
import Button from "./button"
import Icons from "./icons";
import Card from "./card";
import UserCard from "./ucard";
import Modal from "./modal";
import React, { Component } from "react";
import Web3 from "web3";
import $ from 'jquery'; 
import logo from "../images/lovet.svg";
import logoAnimated from "../images/logo_animated.svg";


import img1 from "../images/124.svg";
import img2 from "../images/409.svg";
import img3 from "../images/435.svg";
import img4 from "../images/967.svg";
const { nft_mint_abi, token_approve_abi, nft_abi, token_abi } = require('./solidity_abi');
var BigInt = require("big-integer");

//Web3
const NFT_ADDRESS = "0x5fB74c1597D43db0b326E27f8acd2270f80eC2e0"; //LOVET (Polygon)
const TOKEN_ADDRESS = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"; //WETH (Polygon)
const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/"
const MAX_MINT_AMOUNT = 1;
const MAX_SUPPLY = 1024;
const CHAIN_ID = 137;

const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

const smallAddressFormat = () => {
	var addr="";	
  var i=0;
	for(i=0;i<5;i++){
		addr = addr + ethereum.selectedAddress[i]; 					
	}
	addr = addr + "..."
	for(i=4;i>0;i--){
		addr = addr + ethereum.selectedAddress[42-i]; 					
	}				
	return addr;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const { ethereum } = window;
const web3 = new Web3(window.ethereum);
const nft_contract = new web3.eth.Contract(nft_abi, NFT_ADDRESS);
var downloadingImage = new Image;
downloadingImage.setAttribute('crossOrigin', 'anonymous');


/* Metamask Events */
  ethereum.on('chainChanged', (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
  });
  ethereum.on("accountsChanged", accounts => {
	window.location.reload();
    /*if (accounts.length > 0){
      console.log(`Account connected: ${accounts[0]}`);
      //Display address
	  mint.handleAccountsChanged();
    }
    else
      console.log("Account disconnected");
	*/
  });

//Web3

class MarketPlace extends Component {

  constructor(props) {
    super(props);
    //this.state = {isToggleOn: true};
    this.state={
      cards: [
        {id: 0, nome: "#24", prezzo: 0.005, img: img1, quantità: 0 },
        {id: 1, nome: "#36", prezzo: 0.015, img: img2, quantità: 0 },
        {id: 2, nome: "#9", prezzo: 0.05, img: img3, quantità: 0 },
        {id: 3, nome: "#24", prezzo: 0.005, img: img4, quantità: 0 },
        {id: 4, nome: "#36", prezzo: 0.015, img: img2, quantità: 0 },
        {id: 5, nome: "#9", prezzo: 0.05, img: img3, quantità: 0 }
      ],
      userCards: [{id:99, nome:"lovet", img: logo}],
      text: "CONNECT",
      classModal: "my-modal display-none",
      classDisplayModal: "grid",
      classDisplayConfirmModal: "none",
      classDisplayPostModal: "none",
      idModal: 99,
      nomeModal: "lovet",
      imgModal: logo
    }
    this.imgRef = React.createRef();

    // This binding is necessary to make `this` work in the callback
    this.handleSell = this.handleSell.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleClickConnect = this.handleClickConnect.bind(this);
    this.getImg = this.getImg.bind(this);
  }

  

  handleSell = cardId =>  {
    const card = this.state.userCards[cardId + 1];
    this.setState({classModal: "my-modal display-block",
                    idModal: card.id,
                    nomeModal: card.nome,
                    imgModal: card.img});
    console.log(this.state.userCards[cardId]); 
  }
  handleCloseModal = () =>  {
    this.setState({classModal: "my-modal display-none",
                     classDisplayModal: "grid",
                     classDisplayConfirmModal: "none",
                     classDisplayPostModal: "none"});
  }
  handleSellModal = () =>  {
    this.setState({classDisplayModal: "none"});
    this.setState({classDisplayConfirmModal: "block"})
  }
  handleConfirmModal = () => {
    this.setState({classDisplayConfirmModal: "none"})
    this.setState({classDisplayPostModal: "block"});
    
  }


  /*
  handleIncrement = card => {
    const cards = [...this.state.cards];
    const id = cards.indexOf(card);
    cards[id] = { ...card };
    cards[id].quantità++;
    this.setState({ cards });
  }
  */

  //Web3
  handleClickConnect = async () =>  {
    console.log("connect button");
    try {
      //Login
      await ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await ethereum.request({ method: 'eth_chainId' });

      //Get chain id 
      if(chainId == CHAIN_ID ){ 
        this.setState({ text:"Polygon" });
        //Display address
        this.setState({ text: smallAddressFormat() });
        nft_contract.methods.walletOfOwner(ethereum.selectedAddress).call().then(async (result) => {

          for(let i=0; i < Object.keys(result).length; i++){
             this.getImg(result[i],i);
             await sleep(5000) 
          }
        });

        //Check cost and maxMintable then enable the right button
        //await this.refresh();		
      }
      else{ 
            this.setState({ text: "use Polygon" });
      }
			
		} catch (error) {
			console.error(error);
      		this.setState({ text: "Error: MetaMask is required!" });
		}
  }
  /* Load metadata & image from IPFS */
  getImg = async (tokenId,n) => {
    //Get metadata from contract
    nft_contract.methods.tokenURI(tokenId).call().then( async (result) => {
      const json_URL = IPFS_GATEWAY + result.substring(7);
  
      //Get image from IPFS
      try{
        $.getJSON(json_URL, (data) => {
          var img_URL = data.image;
          const image_URI = IPFS_GATEWAY + img_URL.substring(7);		
          /*this.setState({infoText: "Here is what you got: " + data.name + "<br/>" +
                        "Type: " + data.attributes[0].value + ", Background: " + data.attributes[1].value  + ", Area: " + data.attributes[2].value  + "<br/>" +
                        "I'm loading the image..."});*/
                        console.log("loading");
            
  
          //Load image
          downloadingImage.onload = () => {
            //resize
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = 1000; //this.imgRef.current.clientWidth;
            canvas.height = 1000; //this.imgRef.current.clientWidth;
            ctx.drawImage(downloadingImage, 0, 0, canvas.width, canvas.height);

            const card = {id: n, nome: data.name, img: canvas.toDataURL('image/png')};
            const cards = this.state.userCards;
            cards.push(card);
            this.setState({userCards: cards});
            console.log(this.state.userCards);
            

            /*this.setState({infoText: "Here is what you got: " + data.name + "<br/>" +
                          "Type: " + data.attributes[0].value + ", Background: " + data.attributes[1].value  + ", Area: " + data.attributes[2].value  + "<br/>" +
                          "Done! You can view it on OpenSea"});*/
          };			
          downloadingImage.src = image_URI;
        });
      }catch(error){
        console.log(`Error: ${error.message}`);
        this.setState({ infoText: "Sorry, something went wrong, check on OpenSea.",
                img: logo});
      }	
    });		
  }
  
  render() {
    return (
        <>
          <div>
            <div className="container text-center">
              <h1 className="title-2">MARKET PLACE</h1>     
              <Button text={this.state.text} onClick={this.handleClickConnect}/>      
            </div>
          </div>

          <Modal classModal={this.state.classModal}
                  display= {this.state.classDisplayModal}
                  displayConfirm= {this.state.classDisplayConfirmModal}
                  displayPost= {this.state.classDisplayPostModal}                  
                  title="Set the price"
                  nome={this.state.nomeModal}
                  img={this.state.imgModal}
                  onCloseModal={this.handleCloseModal}
                  onSellModal={this.handleSellModal}
                  onConfirmModal={this.handleConfirmModal}/>

          <div className="sec-3">
            <div className="container">
              <div className="row">
                {this.state.userCards.filter(card => card.id !== 99).map(card => (
                  <UserCard
                    key={card.id}
                    onSell={this.handleSell}
                    card={card}/>
                ))}
              </div>
            </div>
          </div>


          
          <div className="sec-3">
            <div className="container">
              <div className="row">
                {this.state.cards.map(card => (
                <Card
                key={card.id}
                onDelete={this.handleDelete}
                onIncrement={this.handleIncrement}
                card={card}/>
                ))}
              </div>
            </div>
          </div>
        </>

    );
  }
}

export default MarketPlace;


/**/

