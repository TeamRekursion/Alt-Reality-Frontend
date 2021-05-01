localStorage.setItem("myID", "94dcf208-c6fd-4995-a8d3-9c8f3c043118");
localStorage.setItem("roomID", "71cedc0c-b594-4e5e-9872-2b5d855f7da4");

// Receiver
let receiveSocket = new WebSocket("wss://alt.mayankkumar.tech/rooms/broadcast/receive");
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
  console.log(data)
}

// Broadcast
let broadcastSocket = new WebSocket("wss://alt.mayankkumar.tech/rooms/broadcast/send");
console.log("Attempting Connection...");

broadcastSocket.onopen = () => {
  console.log("Successfully Connected");
  broadcastSocket.send(`{\"room_id\": \"${localStorage.getItem("roomID")}\", \"participant_id\": \"${localStorage.getItem("myID")}\"}`)
};

broadcastSocket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  broadcastSocket.send("Client Closed!")
};

broadcastSocket.onerror = error => {
  console.log("Socket Error: ", error);
};

broadcastSocket.onmessage = data => {
  console.log(data)
}