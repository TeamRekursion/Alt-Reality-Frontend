import './style.css'
import Webcam from "webcam-easy";
import { isBroadcastOpen, broadcastSocket } from './socket';

$(document).ready(function() {
  console.log('nj');
  const webcamElement = document.getElementById('webcam');
  const webcam = new Webcam(webcamElement, 'user');
  webcam.start()
    .then(result => {
      console.log("webcam started");
    })
    .catch(err => {
      console.log(err);
    });

  window.addEventListener("keydown", function(e) {
    if (["Space", "ArrowUp", "ArrowLeft"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }, false);

  var bottom = 0;
  var left = 0;

  // Settings
  var steps = 30;
  var interval = 10;
  var debug = true;

  // Elements
  var el = $('.box');
  var ws = $('.winsize');

  var maxBottom = $(window).height();
  var maxLeft = $(window).width();
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

  // Common game logic
  function moveDiv() {
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


  function updateClients(x,y,id){

    var el = $("#"+id);
    if(id !== localStorage.getItem("myID")){
      Mousetrap.bind('up', function() {
        if (y < maxBottom) {
          el.css('bottom', y);
        }
      });
      Mousetrap.bind('down', function() {
        if (true) {
          el.css('bottom', y);
        }
      });
      Mousetrap.bind('left', function() {
        if (left > 0) {
          el.css('left', x );
        }
      });
      Mousetrap.bind('right', function() {
        if (true) {
          el.css('left', x);
        }
      });
    }
  }


  function sendLoc(left, bottom) {
    if (isBroadcastOpen) {
      broadcastSocket.send(JSON.stringify({ "at_x": left, "at_y": bottom }))
    }
  }


  // Parameters from sockets
  var cleft = 30;
  var cbottom = 40;
  var id = "xy1";


  function createUser(x, y, id) {
    // Creating div
    var div = document.createElement("div");
    document.getElementById("app").appendChild(div);
    div.setAttribute('id', id);
    div.setAttribute('class', "box");
    div.innerHTML = "nj"
    div.style.width = "100px";
    div.style.backgroundColor = "white";
    div.style.bottom = y;
    div.style.left = x;
    // var cbottom = y;
    // var cleft = x;
    // moveDiv1(cbottom,cleft,id);
  }

  // use socket to create user
  createUser(cleft, cbottom, id);

  setInterval(moveDiv(), interval);
  //setInterval(moveDiv1(cbottom, cleft, id), interval);

})

export { updateClients };
// module.exports = updateClients;