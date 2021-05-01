import './style.css'
import Webcam from "webcam-easy";

$(document).ready(function () {
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

  window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowLeft"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }, false);

  var bottom = 0;
  var left = 0;

  // Settings
  var steps = 30;
  var interval = 2000;
  var debug = true;

  // Elements
  var el = $('.box');
  var ws = $('.winsize');

  var maxBottom = $(window).height();
  var maxLeft = $(window).width();
  maxLeft -= 50;
  maxBottom -= 50;
  ws.html(maxBottom + 'px | ' + maxLeft + 'px');

  $(window).resize(function () {
    maxBottom = $(window).height();
    maxLeft = $(window).width();
    maxBottom -= 50;
    maxLeft -= 50;
    ws.html(maxBottom + 'px | ' + maxLeft + 'px');
  });

  // common game logic


  function moveDiv() {
    // el.html('L: ' + left + 'px<br>B: ' + bottom + 'px');
    // ws.show();
    Mousetrap.bind('up', function () {
      if (bottom < maxBottom) {
        el.css('bottom', bottom += steps);
      }
    });
    Mousetrap.bind('down', function () {
      if (true) {
        el.css('bottom', bottom -= steps);
      }
    });
    Mousetrap.bind('left', function () {
      if (left > 0) {
        el.css('left', left -= steps);
      }
    });
    Mousetrap.bind('right', function () {
      if (true) {
        el.css('left', left += steps);
      }
    });
    console.log(left, bottom);
    // moveDiv1("xy123");
  }

  function moveDiv1(cbottom, cleft, id) {
    // el.html('L: ' + left + 'px<br>B: ' + bottom + 'px');
    // ws.show();
    console.log(cleft, cbottom);
    // var el = document.getElementById(id);
    var el = $(`#${id}`);
    console.log(el);
    Mousetrap.bind('w', function () {
      if (cbottom < maxBottom) {
        el.css('bottom', cbottom += steps);
      }
    });
    Mousetrap.bind('s', function () {
      if (true) {
        el.css('bottom', cbottom -= steps);
      }
    });
    Mousetrap.bind('a', function () {
      if (cleft > 0) {
        el.css('left', cleft -= steps);
      }
    });
    Mousetrap.bind('d', function () {
      if (true) {
        el.css('left', cleft += steps);
      }
    });
    // setInterval(moveDiv1(cbottom,cleft,id), interval);
  }



  // parameters from sockets
  var cleft = 30;
  var cbottom = 40;
  var id = "xy123";


  function createUser(x, y, id) {
    // creating div
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

  setInterval(moveDiv, interval);
  setInterval(moveDiv1(cbottom, cleft, id), interval);

})