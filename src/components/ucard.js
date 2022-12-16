import React, { Component } from 'react';


class UserCard extends Component{
    render() {
        return(
            <div className="col" >
                <div className="card baseBlock" style={{width: "18rem"}}>
                    <img src={this.props.card.img} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <h4 className="card-title text-center">{this.props.card.nome}</h4>
                    <button onClick={() => this.props.onSell(this.props.card.id)} className="btn btn-outline-primary">Sell</button>
                    </div>
                </div>
            </div>
        );

    }
    
}

export default UserCard;