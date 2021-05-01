import { moveDiv } from './main';
import { loadSockets } from './socket';

var roomID = window.prompt("Enter room id: ")

async function setUpRoom() {
  console.log("NETWORKKK CALL")
  const response = await fetch('https://alt.mayankkumar.tech/rooms/join', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ room_id: roomID })
  });
  var res = await response.json();
  localStorage.setItem("myID", res.body.participant.participant_id);
  localStorage.setItem("roomID", res.body.room.room_id);

  res.body.room.participants.forEach(element => {
    createUser(element.participant_id)
    console.log(element.participant_id)
  });

  moveDiv();
  loadSockets();
}

function createUser(id) {
  // Creating divs
  var div = document.createElement("div");
  document.getElementById("canvas").appendChild(div);
  div.setAttribute('id', id);
  div.innerHTML = "a";
  div.setAttribute('class', 'box');
}

setUpRoom();