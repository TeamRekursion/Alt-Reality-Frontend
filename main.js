import './style.css';
import { initMeet } from "./webrtc";
import { isBroadcastOpen, broadcastSocket } from './socket';

let maxBottom;
let maxLeft;

$(document).ready(function() {
  maxBottom = $(window).height();
  maxLeft = $(window).width();

  window.addEventListener("keydown", function(e) {
    if (["Space", "ArrowUp", "ArrowLeft"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }, false);

  // Elements
  var ws = $('.winsize');

  maxLeft -= 50;
  maxBottom -= 50;
  ws.html(maxBottom + 'px | ' + maxLeft + 'px');

  $(window).resize(function() {
    maxBottom = $(window).height();
    maxLeft = $(window).width();
    maxBottom -= 50;
    maxLeft -= 50;
    ws.html(maxBottom + 'px | ' + maxLeft + 'px');
  });
})

initMeet();

// Send cords over WS
function sendLoc(left, bottom) {
  if (isBroadcastOpen) {
    broadcastSocket.send(JSON.stringify({ "at_x": left, "at_y": bottom }))
  }
}

var bottom = 0;
var left = 0;

// Settings
var steps = 10;

// Game Logic
function moveDiv() {
  var el = $(".box")
  console.log("MOOOOVEE " + localStorage.getItem("myID"));
  Mousetrap.bind('up', function() {
    if (bottom < maxBottom) {
      el.css('bottom', bottom += steps);
      sendLoc(left, bottom);
    }
  });
  Mousetrap.bind('down', function() {
    if (true) {
      el.css('bottom', bottom -= steps);
      sendLoc(left, bottom);
    }
  });
  Mousetrap.bind('left', function() {
    if (left > 0) {
      el.css('left', left -= steps);
      sendLoc(left, bottom);
    }
  });
  Mousetrap.bind('right', function() {
    if (true) {
      el.css('left', left += steps);
      sendLoc(left, bottom);
    }
  });
}

function updateClients(x, y, id) {
  var el = $(".remote");
  if (id != localStorage.getItem("myID")) {
    if (y < maxBottom && x > 0) {
      el.css('bottom', y);
      el.css('left', x);
    }
    

    let distNormal = 1 - (Math.sqrt(Math.pow(left-x, 2) + Math.pow(bottom-y, 2)) / maxLeft);
    let s = document.getElementById("remoteVideo")
    let x0 = document.getElementById("webcamVideo")
    console.log("set volume to: ", distNormal);
    s.volume = distNormal;
    x0.volume = distNormal;
    s.vol
    console.log(s.volume, x0.volume)
  }
}

export { updateClients, moveDiv }