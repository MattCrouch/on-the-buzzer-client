import React, { Component } from "react";
import WebSocketConnection from "./WebSocketConnection";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.connection = new WebSocketConnection(this.onMessage);
  }

  render() {
    return <p>App</p>;
  }
}

export default App;
