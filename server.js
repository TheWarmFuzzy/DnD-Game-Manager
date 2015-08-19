const PORT = 80;

var express = require('express');
var http = require('http');
var app = express();
var server = app.listen(PORT,server_startup);
var io = require('socket.io').listen(server);

app.use("/lib/external", express.static(__dirname + '/lib/external'));

app.get("/", function(request, response){
	response.sendFile(__dirname + '/index.html');
});


function server_startup(){
	var host = server.address().address;
	var port_num = server.address().port;
	console.log("Server at " + "localhost" + ":" +  port_num);
};


io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('message', function(msg){
		console.log('Message: ' + msg);
		io.emit('message', msg);
	});
});