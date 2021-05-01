import './style.css'
import Webcam from "webcam-easy";

$(document).ready(function() {
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
  var interval = 5;
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

  function moveDiv() {
    if (debug) {
      el.html('L: ' + left + 'px<br>B: ' + bottom + 'px');
      ws.show();
    } else if ($('#debug').not(':checked')) {
      el.html('');
      ws.hide();
    }
    Mousetrap.bind('up', function() {
      if (bottom < maxBottom) { el.css('bottom', bottom += steps); }
    });
    Mousetrap.bind('down', function() {
      if (true) { el.css('bottom', bottom -= steps); }
    });
    Mousetrap.bind('left', function() {
      if (left > 0) { el.css('left', left -= steps); }
    });
    Mousetrap.bind('right', function() {
      if (true) { el.css('left', left += steps); }
    });
    Mousetrap.bind('shift', function() {
      $('.help').fadeOut('slow');
      if (debug)
        debug = false;
      else
        debug = true;
    });
  }

  setInterval(moveDiv, interval);
})