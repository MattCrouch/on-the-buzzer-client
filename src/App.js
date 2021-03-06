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

    document.addEventListener("keydown", this.reset.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.reset.bind(this));
  }

  onMessage(data) {
    if (data.event === EVENTS.BUZZ) {
      this.setState({ buzzed: data.payload.button });
    } else if (data.event === EVENTS.QUESTION_RESETTED) {
      this.setState({ buzzed: undefined });
    }
  }

  reset() {
    this.connection.send(EVENTS.RESET_QUESTION);
  }

  render() {
    return (
      <div className="App">
        <div className="Result">
          <div
            className={`team-1 ${
              this.state.buzzed
                ? this.state.buzzed === 1
                  ? "buzzed"
                  : "not-buzzed"
                : ""
            }`}
          ></div>
          <div
            className={`team-2 ${
              this.state.buzzed
                ? this.state.buzzed === 2
                  ? "buzzed"
                  : "not-buzzed"
                : ""
            }`}
          ></div>
        </div>
      </div>
    );
  }
}

export default App;
