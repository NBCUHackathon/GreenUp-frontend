var socket = io('http://45.55.134.215:9999');
function clickLogin () {
	var email = document.getElementById('userNameInput').value;
	var pass = document.getElementById('passwordInput').value;
	authenticateUser(email, pass);
}

function authenticateUser(email, pass) {
	console.log('auth-ing with '+email+' '+pass);

 	//request for customer token
	socket.emit('auth.user', {userEmail: email, password: pass});
}

socket.on('auth.tokenReceived', function(token) {
	console.log('user successfully logged in!');
	//TODO: store auth token somewhere
});

socket.on('auth.tokenDenied', function() {
	// console.log('failed to log user in!');
});