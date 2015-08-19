var crypto = require('crypto');
module.exports = {
	//Splits the strings into set sizes
	split_string: function(string, block_size){
		//Where the new string will be stored
		var temp_strings = new Array();
		var i = 0;
		var finished = false;
		
		//Loops until the string has been broken entirely
		do{
			//If there is less than or only the block size left
			if((i + 1) * block_size >= string.length){
				finished = true;
				temp_strings.push(string.slice(i * block_size, string.length));
			}else{
				temp_strings.push(string.slice(i * block_size, (i + 1) * block_size));
			}
			i++;
		}while(finished == false);
		
		return temp_strings;
	},
	hash_set: function(array){
		//Loops through array
		for(i = 0; i < array.length; i++){
			//Sets hash method
			var md5 = crypto.createHash('md5');
			
			//Adds data
			md5.update(array[i]);
			
			//Hashes data
			array[i] = md5.digest('hex');
		}
		return array;
	},
	
	join_and_shorten: function(array,length){
		//Joins array
		var hash = array.join('');
		
		//Shortens to the new length
		hash = hash.slice(0,length);
		
		return hash;
	},
	replace_invalid_characters: function(string){
		var temp_array = new Array();
		
		//Sets valid characters
		var valid_string = "abcdefgiklmnoprstuvABCDEFGIKLMNOPRSTUV       .";
		
		//Loops through string
		for(var i = 0; i < string.length; i++){
			//Gets ASCII value
			var code = string.charCodeAt(i);
			
			//Uses ASCII value to find new valid letter
			temp_array.push(valid_string.charAt((code + i) % valid_string.length));
		}
		
		return temp_array.join('');
	},
	translate: function(string){
		var array = this.split_string(string, 32);
		array = this.hash_set(array);
		var hash = this.join_and_shorten(array,string.length);
		hash = this.replace_invalid_characters(hash);
		return hash;
	}
};