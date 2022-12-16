import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';

class Modal extends Component{

    constructor(props) {
        super(props);
        //this.state = {isToggleOn: true};
        this.state={
            price:0   
        }
    }

    handleChange = (value) => {
        this.setState({price: value});
    }


    render() {
        return(        
            <div className={this.props.classModal}>
                <h2 className="modal-title">{this.props.title}</h2>
                <img src={this.props.img} style={{width: "400px", height:"400px"}}></img>
                <h3 className="modal-title">{this.props.nome}</h3>

                <div style={{display: this.props.display, gridTemplateColumns: "max-content max-content max-content", gridGap: "10px", margin:"20px 0 20px 0px"}}>
                    <h4>Price (WETH):</h4>
                    <NumericInput 
                        onChange={this.handleChange}
                        value={this.state.price}
                        className="form-control input-modal" style={ false }/>
                    <button className="btn btn-outline-danger" onClick={this.props.onCloseModal} > Close</button>
                    <button className="btn btn-primary" style={{float: "right"}} onClick={this.props.onSellModal}>Sell</button>
                </div>

                <div style={{display: this.props.displayConfirm, width: "400px", margin:"20px 0 20px 0px"}}>
                    <h4>Are you sure to sell {this.props.nome} for {this.state.price} WETH?</h4>
                    <h5>You can always withdraw your $LOVET from sale when you want.</h5>
                    <button className="btn btn-outline-danger" onClick={this.props.onCloseModal} > Close</button>
                    <button className="btn btn-primary" style={{float: "right"}} onClick={this.props.onConfirmModal}>Yes</button>
                </div>

                <div style={{display: this.props.displayPost, width: "400px", margin:"20px 0 20px 0px"}}>
                    <h4>First click Approve and confirm the transaction.</h4>
                    <h4>Then click Sell to post your sale.</h4>
                    <button className="btn btn-outline-danger" onClick={this.props.onCloseModal}> Close</button>
                    <button className="btn btn-primary" style={{float: "right"}} onClick={this.props.onApprove}>Approve</button>
                    <button className="btn btn-primary" style={{float: "right"}} onClick={this.props.onSell}>Sell</button>
                </div>

                </div>
        );

    }
    
}

export default Modal;