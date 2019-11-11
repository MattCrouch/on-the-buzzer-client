import React, { Component } from "react";
import WebSocketConnection from "./WebSocketConnection";
import EVENTS from "./events";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      buzzed: undefined
    };
  }
  componentDidMount() {
    this.connection = new WebSocketConnection(this.onMessage.bind(this));
  }

  onMessage(data) {
    if (data.event === EVENTS.BUZZ) {
      this.setState({ buzzed: data.payload.button });
    } else if (data.event === EVENTS.QUESTION_RESETTED) {
      this.setState({ buzzed: undefined });
    }
  }

  render() {
    return <p>{this.state.buzzed}</p>;
  }
}

export default App;
