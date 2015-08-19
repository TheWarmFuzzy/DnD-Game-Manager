function SpeechEngine(){
	var messageHeader = "dnd_message";
	this.sForm; //Send Message Box
	this.rBox; //Receive Message Box
}

SpeechEngine.prototype.initialize = function(){
	
}


SpeechEngine.prototype.initializeEvents = function(){
	var self = this;
	socket.on(messageHeader, function(msg){
		self.onReceive(msg);
	});
	
	this.sBox.parent.submit(function(){
		self.onSend();
	}
}

//Sets the box that contains the message to be sent
SpeechEngine.prototype.setSendMessageBox = function(sBox){
	
}

//Sets the box that contains the messages to be displayed
SpeechEngine.prototype.setReceiveMessageBox = function(rBox){
	
}

//Sends the message to the server
SpeechEngine.prototype.onSend = function(){
	//Ends the function if there is no message box
	if(typeof(this.sForm) == "undefined"){return false;};
	
	socket.emit(messageHeader, $('#m').val());
	
	this.sBox.val('');
}

//Displays the message on the client
SpeechEngine.prototype.onReceive = function(message){
	//Ends the function if there is no box to put the message in
	if(typeof(this.rBox) == "undefined"){return false;};
	
	//Append the message to the chat window
	this.rBox.append($('<li>').text(message));
}