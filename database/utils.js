var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var models = require('./models');
// подключение
var uri = 'mongodb://127.0.0.1/test';

module.exports.addUser = function(msg){
	mongoose.connect(uri, (err)=>{
		if (err) throw err;
		var user = new models.user(
			{
			_id : msg.from.id,
			first_name: msg.from.first_name,
			last_name: msg.from.last_name
		});
		user.save((err)=> {
			mongoose.disconnect();
			if(err) return console.log(err);
			console.log("Сохранен объект user", user);
		});
	});
}

module.exports.updCity = function(msg){
	mongoose.connect(uri, (err, usr)=>{
		models.user.findById(msg.from.id, function (err, doc) {
			if (err) throw err;
			doc.city = msg.text;
			doc.save((err)=>{
				mongoose.disconnect();
				if (err) throw err;
				console.log('City is updated | new city: '+msg.text);
			});
		});
	})
}

module.exports.addMessage = function(msg, imp){
	if (imp == undefined) imp = false;
	mongoose.connect(uri, (err, usr)=>{
		if (err) throw err;
		var dbMsg = new models.message(
			{
				from: msg.from.id,
				text: msg.text,
				important : imp
			}
		)
		dbMsg.save((err)=>{
			mongoose.disconnect();
			if (err) throw err;
			console.log('Message succesfull added | text: '+ msg.text);
		})
	});
}

module.exports.addCart = function(msg, match){
	console.log('Text message | 'msg.text)
	console.log(match[0]);
}