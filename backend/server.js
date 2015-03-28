//Server Init Stuff
var http = require("http");
var server = http.createServer(requestHandler);
function requestHandler(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("Hello World");
    res.end();
}

//require db npm package
var mongojs = require('mongojs');

//Socket.io init
var io = require('socket.io')(server);

//To handle REST calls
var request = require('request');

server.listen(9999);

//mongo servers
// var golferDB = mongojs('golf', ['golfer_reservation_requests']);
// var courseDB = mongojs('golf', ['course_reservation_requests']);


//while connected to a client
io.on('connection', function(socket) {

	socket.on('reservation.sent', function(data){

		


		

		// golferDB.golfer_reservation_requests.findAndModify({
  //           query: {_id:mongojs.ObjectId(doc.caseId)},
  //           update: { $push: {"reservation_requests":doc._id}}
  //       });
	});


	socket.on('reservations.get.golfer', function(data){});


	socket.on('reservations.get.course', function(data){});

});