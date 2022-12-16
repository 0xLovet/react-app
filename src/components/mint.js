import Button from "./button"
import React, { Component } from "react";
import Web3 from "web3";
import $ from 'jquery'; 
import logo from "../images/lovet.svg";
import logoAnimated from "../images/logo_animated.svg";
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
var mintAmount = 1;
var approved = false;
var cost;
var minted;
var maxTokenWallet;
var tokenBalance;
var maxMintable;
var paused;
var state;

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

class Mint extends Component {

  constructor(props) {
    super(props);
    //this.state = {isToggleOn: true};
    this.state = {
      text: "CONNECT",
	  img: logo,
      infoText: "Click the CONNECT button to login with MetaMask. Use the Polygon network.",
      priceText: "PRICE: ?",
      supplyText: "MINTED: ?/1024"
    }
	this.imgRef = React.createRef();

    // This binding is necessary to make `this` work in the callback
	this.refresh = this.refresh.bind(this);
	this.getImg = this.getImg.bind(this);
	this.handleClickConnect = this.handleClickConnect.bind(this);
    this.handleClickMint = this.handleClickMint.bind(this);
    this.handleClickApprove = this.handleClickApprove.bind(this);
  }

  /* Refresh contract status & get img */
  refresh = async () => {
	//Get cost
	await nft_contract.methods.cost().call().then(async function (result) {
		cost = web3.utils.fromWei(result);
		if(cost == 0){
			approved = true;
		}
	});
	//Get maxMintable
	await nft_contract.methods.maxMintable().call().then(async function (result) {
		maxMintable = parseInt(result);
	});
	//Get contract state
	await nft_contract.methods.paused().call().then(async function (result) {
		paused = result;
	});
	//Get Supply
	const response_maxMintable = await nft_contract.methods.getTotalSupply().call().then(async (result) => {
		if(result < maxMintable){
			this.setState({priceText: "PRICE: " + cost + " WETH"});
			this.setState({supplyText: "MINTED: " + result + "/" + maxMintable});
			return true;
		}
		else{
			this.setState({priceText: "SOLD OUT!"});
			this.setState({supplyText: "SOLD OUT!"});
			this.setState({infoText: "SOLD OUT!"});
			return false;
		}
	});
	//Get maxTokenWallet
	const response_maxWallet = await nft_contract.methods.maxTokenWallet().call().then(async (result) => {
		maxTokenWallet = parseInt(result);

		//Get balanceOf user
		const response = await nft_contract.methods.balanceOf(ethereum.selectedAddress).call().then(async (result) => {
			tokenBalance = parseInt(result);
			if ( tokenBalance >= maxTokenWallet ) {
				this.setState({infoText: "You already have enough $LOVET!"});
				return false;
			}
			else {
				if(response_maxMintable && !paused){
					if ( cost > 0) {
						if(!approved){
							this.setState({infoText: "Then click APPROVE to allow to spend WETH."});
						}
					}
					else{
						this.setState({infoText: "Then click MINT."})
					}
				}
				else{
					if (paused){
						this.setState({infoText: "The minting is paused"});
					}
				}					
				return true;
			}
		});
		return response;
	});

	return response_maxWallet && response_maxMintable;
  };
  /* Load metadata & image from IPFS */
  getImg = async (tokenId) => {
	//Get metadata from contract
	nft_contract.methods.tokenURI(tokenId).call().then( async (result) => {
		const json_URL = IPFS_GATEWAY + result.substring(7);

		//Get image from IPFS
		try{
			$.getJSON(json_URL, (data) => {
				var img_URL = data.image;
				const image_URI = IPFS_GATEWAY + img_URL.substring(7);		
				this.setState({infoText: "Here is what you got: " + data.name + "<br/>" +
											"Type: " + data.attributes[0].value + ", Background: " + data.attributes[1].value  + ", Area: " + data.attributes[2].value  + "<br/>" +
											"I'm loading the image..."});

				//Load image
				downloadingImage.onload = () => {
					//imgLink.href = image_URI;
					//resize
					var canvas = document.createElement('canvas');
					var ctx = canvas.getContext('2d');
					canvas.width = this.imgRef.current.clientWidth;
					canvas.height = this.imgRef.current.clientWidth;
					ctx.drawImage(downloadingImage, 0, 0, canvas.width, canvas.height);
					this.setState({img: canvas.toDataURL('image/png')});
					this.setState({infoText: "Here is what you got: " + data.name + "<br/>" +
												"Type: " + data.attributes[0].value + ", Background: " + data.attributes[1].value  + ", Area: " + data.attributes[2].value  + "<br/>" +
												"Done! You can view it on OpenSea"});
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

				//Check cost and maxMintable then enable the right button
				await this.refresh();		
			}
			else{ 
        		this.setState({ text: "use Polygon" });
			}
			
		} catch (error) {
			console.error(error);
      		this.setState({ text: "Error: MetaMask is required!" });
		}
  }
  handleClickApprove = async () => {
    console.log("approve button");
    const response = await this.refresh();

		if( ethereum.selectedAddress.length > 0 && response){
			
			console.log("in approve 1")
			//Get cost
			nft_contract.methods.cost().call().then(async (result) => {
				cost = BigInt(result) *  BigInt(mintAmount);
				
				//Approve
				const encodedFunction = web3.eth.abi.encodeFunctionCall(token_approve_abi, [NFT_ADDRESS, cost]);
				const transactionParameters = {
					to: TOKEN_ADDRESS,
					from: ethereum.selectedAddress,
					data: encodedFunction
				};          

				// As with any RPC call, it may throw an error
				try {
					const txHash = await ethereum.request({
					method: 'eth_sendTransaction',
					params: [transactionParameters],
					});
					this.setState({ infoText: "Waiting tx...",
									img: logoAnimated });
					
					//WAITING FOR SUCCESS TX
					let txReceipt = null;
					while (txReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
						txReceipt = await web3.eth.getTransactionReceipt(txHash);
						await sleep(2000)
					}
					if (txReceipt.status){		
						approved = true;
            			this.setState({ infoText: "Tx confirmed!<br>Click MINT to get your " + mintAmount + " $LOVET.",
										img: logo });
					}
					else{
            			this.setState({ infoText: "Something went wrong, check the transaction or retry." });
					}
				} catch (error){
					console.log(`Error: ${error.message}`);
					this.setState({ infoText: "Something went wrong, check the transaction or retry." });
				}
			});	
		} else{
			console.log("Error no address no mintAmount");
		}    		
  }
  handleClickMint = async () => {
    console.log("mint button");
	var tokenId;
	const response = await this.refresh();

	if( ethereum.selectedAddress.length > 0 && response){
		//mint
		const encodedFunction = web3.eth.abi.encodeFunctionCall(nft_mint_abi, [mintAmount]);
		const transactionParameters = {
			to: NFT_ADDRESS,
			maxPriorityFeePerGas: "a7a358200", // 45 Gwei = 45000000000 wei
				maxFeePerGas: "ba43b7400", // 50 Gwei = 50000000000 wei
			from: ethereum.selectedAddress,
			data: encodedFunction
		};              
		
		// As with any RPC call, it may throw an error
		try {
			const txHash = await ethereum.request({
			method: 'eth_sendTransaction',
			params: [transactionParameters],
			});	
			this.setState({ infoText: "Waiting tx...",
							img: logoAnimated });

			//WAITING FOR SUCCESS TX
			let txReceipt = null;
			while (txReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
				txReceipt = await web3.eth.getTransactionReceipt(txHash);
				await sleep(2000)
			}

			//GET TOKEN ID FROM TX
			if (txReceipt.status){
				this.setState({ infoText: "Your tx has been confirmed! I'm loading your new NFT..." });		
				
				//Get tokenId
				if ( cost > 0 ) {
					tokenId = parseInt(txReceipt.logs[2].topics[3],16);
				}
				else{
					tokenId = parseInt(txReceipt.logs[0].topics[3],16);
				}
			}
			else{
				this.setState({ infoText: "Something went wrong, check the transaction or retry.",
								img: logo });
			}
		} catch (error){
			console.log(`Error: ${error.message}`);
			this.setState({ infoText: "Something went wrong, check the transaction or retry.",
							img: logo});
		}
	} else{
		console.log("Error no address no mintAmount");
		this.setState({ img: logo });
	}    
	//Wait totalSupply update and request the image from IPFS
	let totSupply = 0; 
	while (totSupply < tokenId) { 
		await sleep(1000)
		totSupply = await nft_contract.methods.getTotalSupply().call().then( async function (result) {
			return result;
		});
	}
	this.getImg(tokenId);
  } 
  //Web3

  render() {
    return (
      <>
        <div>
          <div className="container text-center">
            <h1 className="title-2">MINT NOW</h1>        
             
          </div>
        </div>
        <div className="text-center">
            <div className="container text-center">
				<div className="col" >
					<div className="card  mx-auto" style={{width: "35rem", borderRadius: "40px", backgroundColor: "rgba(0, 0, 0, 0.7)",color: "white"}}>
						<Button text={this.state.text} onClick={this.handleClickConnect}/>  
						<img ref={this.imgRef}  src={this.state.img} className="card-img-top" style={{ borderRadius: "40px 40px 0 0"}} alt="..."></img>
						<div className="card-body">
							<h4 style={{float: "left"}}>{this.state.priceText}</h4>
							<h4 style={{float: "right"}}>{this.state.supplyText}</h4>
							<h5 className="card-text" style={{marginTop: "40px"}}>{this.state.infoText}</h5>
							<Button text="APPROVE" onClick={this.handleClickApprove}/>
							<Button text="MINT" onClick={this.handleClickMint}/>
						</div>
						<Button text="ADD $LOVET"/>
					</div>
				</div>
            </div>
        </div>
		<div className="container text-center">
			<div className="card mb-3 mx-auto hcard p-1 mb-5"  >
                <div className="row g-3 ">
                    <div className="col-md-4">
						<img ref={this.imgRef}  src={this.state.img} className="card-img-top" style={{ borderRadius: "40px 40px 0 0"}} alt="..."></img>
					</div>
                    <div className="col-md-8">
					<Button text={this.state.text} onClick={this.handleClickConnect}/> 
						<div className="card-body">
							
							<h4 style={{float: "left"}}>{this.state.priceText}</h4>
							<h4 style={{float: "right"}}>{this.state.supplyText}</h4>
							<h5 className="card-text" style={{marginTop: "40px"}}>{this.state.infoText}</h5>
							<Button text="APPROVE" onClick={this.handleClickApprove}/>
							<Button text="MINT" onClick={this.handleClickMint}/>
						</div>
                    </div>
                </div>
            </div>
		</div>
		
      </>
    );
  }
}

export default Mint;





