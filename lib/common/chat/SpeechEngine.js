function SpeechEngine(){
	this.messageHeader = "dnd_message";
	this.sForm; //Send Message Box
	this.rBox; //Receive Message Box
}

SpeechEngine.prototype.initialize = function(){
	this.sForm = $("#frm_chat");
	this.rBox = $("#lst_messages");
	this.initializeEvents();
}


SpeechEngine.prototype.initializeEvents = function(){
	var self = this;
	socket.on(this.messageHeader, function(message){
		self.onReceive(message);
	});
	
	this.sForm.submit(function(){
		self.onSend();
		return false;
	});
}

//Sends the message to the server
SpeechEngine.prototype.onSend = function(){
	//Ends the function if there is no message box
	if(typeof(this.sForm) == "undefined"){return false;};
	console.log();
	var message = this.sForm.children("#ipt_message_box").val();
	var lang = this.sForm.children("#slc_lang").val();
	socket.emit(this.messageHeader, {"message":message, "lang":lang});
	
	this.sForm.children("#ipt_message_box").val('');
}

//Displays the message on the client
SpeechEngine.prototype.onReceive = function(message){
	//Ends the function if there is no box to put the message in
	if(typeof(this.rBox) == "undefined"){return false;};
	
	//Append the message to the chat window
	this.rBox.append($('<li class="' + message["lang"] + ' normal">').text(message["message"]));
}