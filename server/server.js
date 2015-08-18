var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendfile('index.html');
});

io.on('connection', function(socket){
	console.log('A user has connected');
	
	socket.on('disconnect', function(){
		console.log('A user has disconnected');
	});
	
	socket.on('message', function(msg){
		console.log('Message: ' + msg);
		io.emit('message', msg);
	});
});

http.listen(800, function(){
	console.log("Listening on localhost:800");
});