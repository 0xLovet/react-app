import React, { Component } from 'react';


class Button extends Component{

    render() {
        return(
            <button type="button" className="my-btn" onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

export default Button;