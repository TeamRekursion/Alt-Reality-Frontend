$('.joinmeeting').click(function(e) {
  e.preventDefault();

  let meetingID = $("#chottu").val()
  console.log(meetingID);

  if (meetingID == "") {
    window.location.href = "../app.html";
  } else {
    window.location.href = "../app.html?meetid=" + meetingID;
  }
});