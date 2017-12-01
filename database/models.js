var Schema = require("mongoose").Schema;
var mongoose = require("mongoose");

// установка схемы
var userScheme = new Schema({
	_id : Number,
	first_name: {
		type: String,
		default: "NoName"
	},
	last_name: {
		type: String,
		default: "NoName"
	},
	city: {
		type: String,
		default: "NOT"
	},
	payd: {
		type: Boolean,
		default: false
	},		
	cash: {
		type: Number,
		default: 0
	}
});

var msgScheme = new Schema({
	from:{
		type: Number,
		default: 0
	},
	important: {
		type: Boolean,
		default: false
	},
	text:{
		type: String,
		default: "nothing"
	},
	created:{
		type: Date,
		default: Date.now
	}
});

var User = mongoose.model("User", userScheme);
var Message = mongoose.model("Message", msgScheme);

module.exports = {user:User, message: Message};

var req = {
	"message_id":12,
	"from":{
		"id":415021035,
		"is_bot":false,
		"first_name":"Sergey",
		"last_name":"Sergey",
		"language_code":"ru"
	},
	"chat":{
		"id":415021035,
		"first_name":"Sergey",
		"last_name":"Sergey",
		"type":"private"
	},
	"date":1510765831,
	"text":"/start",
	"entities":[{"offset":0,"length":6,"type":"bot_command"}]
}
