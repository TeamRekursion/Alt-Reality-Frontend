// function send(e){
//     e.preventDefault();
//     console.log('nj')
//     postForm('http://example.com/api/v1/users')
//     .then(data => console.log(data))
//     .catch(error => console.error(error))

//     function postForm(url) {
//     const formData = new FormData(document.querySelector('form.form'))

//     return fetch(url, {
//         method: 'POST', // or 'PUT'
//         body: formData  // a FormData will automatically set the 'Content-Type'
//     })
//     .then(response => response.json())
//     }
// }

$('.joinmeeting').click(function (e) {
    e.preventDefault();

    if(form.room_id.value === ""){
        postForm('https://alt.mayankkumar.tech/rooms/create')
        .then(data => { 
            
            console.log(data.body)
        localStorage.setItem("roomID",data.body.room_id);
        // localStorage.setItem("myID",data.body.participant.participant_id);

        location.href = '../app.html';
        })
        .catch(error => console.error(error))
        console.log(e);
        function postForm(url) {
            // let formData = new FormData(form);
            var object = {};
            object["name"]="Awesome Room";
            object["offer_str"]="sadsadsad";
            // formData.forEach(function (value, key) {
            //     // console.log(value)
            //     object[key] = value;
            // });
            console.log(JSON.stringify(object));

        return fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(object)  // a FormData will automatically set the 'Content-Type'
        })
        .then(response => response.json())
        }






    }
    else{
        postForm('https://alt.mayankkumar.tech/rooms/join')
        .then(data => { 
            
        // console.log(data.body)
        localStorage.setItem("roomID",data.body.room.room_id);
        localStorage.setItem("roomname",data.body.room.name);
        localStorage.setItem("myID",data.body.participant.participant_id);

        location.href = '../app.html';
        })
        .catch(error => console.error(error))
        // console.log(e);
        function postForm(url) {
            // let formData = new FormData(form);
            var object = {};
            object["room_id"]=`"${form.room_id.value}"`;
            // formData.forEach(function (value, key) {
            //     // console.log(value)
            //     object[key] = value;
            // });
            console.log(JSON.stringify(object));

        return fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(object)  // a FormData will automatically set the 'Content-Type'
        })
        .then(response => response.json())
        }
    }
    

});