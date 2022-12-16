import React, { Component } from 'react';


class Card extends Component{
    render() {
        return(
            <div className="col" >
                <div className="card baseBlock" style={{width: "18rem"}}>
                    {/*<button onClick={() => this.props.onIncrement(this.props.card)} className="btn btn-primary">
                        Add <span className='badge badge-light'>{this.props.card.quantità}</span></button>*/}
                    <img src={this.props.card.img} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <h4 className="card-title text-center">{this.props.card.nome}</h4>
                    {/*<h6>Type: Line+Dot <br/>Background: #45af4b<br/>Area: 234  </h6>
                    <p className="card-text">{this.props.card.prezzo} WETH</p>*/}
                    <button onClick={() => this.props.onDelete(this.props.card.id)} className="btn btn-outline-primary">Buy</button>
                    </div>
                </div>
            </div>
        );

    }
    
}

export default Card;