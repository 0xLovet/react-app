import React, { Component } from 'react';
import { Link } from "react-router-dom";



class Card extends Component{
    render() {
        return(
            <div className="card mb-3 mx-auto hcard p-1 mb-5"  >
                <div className="row g-3 ">
                    <div className="col-md-4">
                        <img src={this.props.img} className="img-fluid  " alt="..." style={{borderRadius: "35px"}}></img>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{this.props.title}</h5>
                            <h6 className="card-text">{this.props.info_1}</h6>
                            <h6 className="card-text"><small className="text-muted">{this.props.info_2}</small></h6>
                            <Link className="my-btn small-btn" to={this.props.link}>{this.props.buttonText}</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
    
}

export default Card;