import { updateClients } from './main';

// Receiver
let receiveSocket;
let broadcastSocket;


function loadSockets() {
  receiveSocket = new WebSocket("wss://alt.mayankkumar.tech/rooms/broadcast/receive");
  console.log("Attempting Connection...");

  receiveSocket.onopen = () => {
    console.log("Successfully Connected");
    receiveSocket.send(`{\"room_id\": \"${localStorage.getItem("roomID")}\", \"participant_id\": \"${localStorage.getItem("myID")}\"}`)
  };

  receiveSocket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    receiveSocket.send("Client Closed!")
  };

  receiveSocket.onerror = error => {
    console.log("Socket Error: ", error);
  };

  receiveSocket.onmessage = data => {
    var data = JSON.parse(data.data);
    var coord = data.co_ordinates;
    var pid = data.participant_id;
    console.log(coord, data);
    // console.log(`x: ${coord.at_x} y:${coord.at_y}`)
    updateClients(coord.at_x, coord.at_y, pid);
  }

  broadcastSocket = new WebSocket("wss://alt.mayankkumar.tech/rooms/broadcast/send");
  console.log("Attempting Connection...");

  broadcastSocket.onopen = () => {
    console.log("Successfully Connected");
    isBroadcastOpen = true;
    broadcastSocket.send(`{\"room_id\": \"${localStorage.getItem("roomID")}\", \"participant_id\": \"${localStorage.getItem("myID")}\"}`)
  };

  broadcastSocket.onclose = event => {
    isBroadcastOpen = false;
    console.log("Socket Closed Connection: ", event);
    broadcastSocket.send("Client Closed!")
  };

  broadcastSocket.onerror = error => {
    isBroadcastOpen = false;
    console.log("Socket Error: ", error);
  };

  broadcastSocket.onmessage = data => {
    console.log(data)
  }
}

// Broadcast
var isBroadcastOpen = false;

export { isBroadcastOpen, broadcastSocket, loadSockets }