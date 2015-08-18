function SpeechEngine(){
	this.sBox; //Send Message Box
	this.rBox; //Receive Message Box
}

//Sets the box that contains the message to be sent
SpeechEngine.prototype.setSendMessageBox = function(sBox){
	
}

//Sets the box that contains the messages to be displayed
SpeechEngine.prototype.setReceiveMessageBox = function(rBox){
	
}

//Sends the message to the server
SpeechEngine.prototype.sendMessage = function(){
	//Ends the function if there is no message box
	if(typeof(this.sBox) == "undefined"){return false;};
	
}

//Displays the message on the client
SpeechEngine.prototype.displayMessage = function(){
	//Ends the function if there is no box to put the message in
	if(typeof(this.rBox) == "undefined"){return false;};
	
}