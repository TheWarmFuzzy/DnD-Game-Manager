const PORT = 80;

var express = require('express');
var http = require('http');
var crypto = require('crypto');
var lang = require('./lib/server/chat/lang.js');
var app = express();
var server = app.listen(PORT,server_startup);
var io = require('socket.io').listen(server);

app.use("/assets", express.static(__dirname + '/assets'));
app.use("/lib/external", express.static(__dirname + '/lib/external'));
app.use("/lib/common", express.static(__dirname + '/lib/common'));

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
	socket.on('dnd_message', function(msg){
		console.log('Message: ' + msg["message"] + " Language: " + msg["language"]);
		
		var message = lang.translate(msg["message"]);
		var language = msg["language"];
		var time = (new Date()).toLocaleTimeString();
		
		io.emit('dnd_message',{"message":message, "language":language, "time":time});
	});
});