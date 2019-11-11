import CONSTANTS from "./constants";
import EVENTS from "./events";

export class WebSocketConnection {
  constructor(messageCallback) {
    // Attach an ID if the user has one from before
    let pathToServer = CONSTANTS.WEBSOCKET_URI;
    const existingId = getId();

    if (existingId) {
      pathToServer += `?id=${existingId}`;
    }

    // Connect to server
    this.connection = new WebSocket(pathToServer);

    // Attach listener for WebSocket events
    this.connection.onmessage = this.onMessage.bind(this);

    // Store reference to external callback for later
    this.messageCallback = messageCallback;
  }

  // What to do when we receive a message from the server
  onMessage(event) {
    // Convert the JSON string into an object
    const data = JSON.parse(event.data);

    // Set the new ID from the state passed
    if (data.event === EVENTS.INITIAL_STATE) {
      setId(data.payload.id);
    }

    // Pass to React if any other message
    if (this.messageCallback) {
      this.messageCallback(data);
    }
  }

  // Send a message to the server
  send(event, payload) {
    this.connection.send(
      JSON.stringify({
        event,
        payload
      })
    );
  }
}

// Get the ID from session storage
function getId() {
  return sessionStorage.getItem("id");
}

// Store the ID in session storage
function setId(id) {
  sessionStorage.setItem("id", id);
}

export default WebSocketConnection;
