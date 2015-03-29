var socket = io('http://45.55.134.215:9999');

function clickLogin () {
	console.log('clicked login');
	var email = document.getElementById('userNameInput').value;
	var pass = document.getElementById('passwordInput').value;
	authenticateUser(email, pass);
}

function authenticateUser(email, pass) {
	console.log('auth-ing with '+email+' '+pass);

 	//request for customer token
	socket.emit('auth.user', {userEmail: email, password: pass});
	socket.emit('test', {stuff: "oh.. hi"});
}

socket.on('auth.tokenReceived', function(token) {
    var t = document.querySelector("paper-toast");
    t.text = "Logged in successfully!";
    t.show();
	console.log('user successfully logged in!');

    var t = document.querySelector("#loginCred");
    console.log(t);
    if(t.style.opacity === "1") {
        t.style.opacity = 0;
        console.log("made it 0");
        console.log(t);
    } else {
        t.style.opacity = 1;
        console.log("made it 1");
        console.log(t);
    }
	//TODO: store auth token somewhere
});

socket.on('auth.tokenDenied', function() {
    var t = document.querySelector("paper-toast");
    t.text = "Couldn't log in. Try again.";
    t.show();
	console.log('failed to log user in!');
});

socket.on('ack', function(data){
	console.log('got it!');
});