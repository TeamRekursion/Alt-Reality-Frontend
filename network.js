import { moveDiv } from './main';
import { loadSockets } from './socket';

async function createRoom(offer_str) {
  console.log("NETWORKKK CALL")
  const response = await fetch('https://alt.mayankkumar.tech/rooms/create', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: "Best Room", offer_str: offer_str })
  });
  var res = await response.json();
  localStorage.setItem("roomID", res.body.room_id);
  localStorage.setItem("roomName", res.body.name);

  return res.body.room_id;
}

async function setUpRoom(roomID) {
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
    console.log(element.participant_id)
  });

  moveDiv();
  loadSockets();

  return res.body.room.offer_str;
}

function createUser(id) {
  // Creating divs
  var div = document.createElement("div");
  document.getElementById("canvas").appendChild(div);
  div.setAttribute('id', id);
  div.setAttribute('class', 'box');
}

export { setUpRoom, createRoom }