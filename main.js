import './style.css';
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

// Send cords over WS
function sendLoc(left, bottom) {
  if (isBroadcastOpen) {
    broadcastSocket.send(JSON.stringify({ "at_x": left, "at_y": bottom }))
  }
}

var bottom = 0;
var left = 0;

// Settings
var steps = 30;

// Game Logic
function moveDiv() {
  var el = $("#" + localStorage.getItem("myID"))
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
  var el = $("#" + id);
  if (id != localStorage.getItem("myID")) {
    if (y < maxBottom && x > 0) {
      el.css('bottom', y);
      el.css('left', x);
    }
  }
}

export { updateClients, moveDiv }