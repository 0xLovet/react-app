import Navbar from "./components/navbar";
import Main from "./components/main";
import React, { Component } from "react";

import "./App.css";
import Footer from "./components/footer";


class App extends Component {
  
  /*state={
    cards: [
      {id: 0, nome: "primo", prezzo: 0.005, img: img1, quantità: 0 },
      {id: 1, nome: "secondo", prezzo: 0.015, img: img2, quantità: 0 },
      {id: 2, nome: "terzo", prezzo: 0.05, img: img3, quantità: 0 }
    ]
  }

  handleDelete = cardId =>  {
    const cards = this.state.cards.filter(card => card.id !== cardId);
    this.setState({ cards });
  }

  handleIncrement = card => {
    const cards = [...this.state.cards];
    const id = cards.indexOf(card);
    cards[id] = { ...card };
    cards[id].quantità++;
    this.setState({ cards });
  }
  */

  render() {
    return (
      <div className="background">
        <Navbar/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;

