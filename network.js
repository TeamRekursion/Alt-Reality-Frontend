import { moveDiv } from './main';

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
}

function createUser(id) {
  // Creating divs
  var div = document.createElement("div");
  document.getElementById("app").appendChild(div);
  div.setAttribute('id', id);
  div.setAttribute('class', 'box');
}

setUpRoom();