var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var models = require('./models');
// подключение
var uri = 'mongodb://jopo4ka:Password1@ds129156.mlab.com:29156/telebot_v2';

function random(min, max)
{
  return Math.random() * (max - min) + min;
}

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

module.exports.addOrder = function(msg, match, group){
	if (group == undefined) group = "WTF???";
	mongoose.connect(uri, (err, usr)=>{
		if (err) throw err;
		var dbOrder = new models.order({
			owner: msg.from.id,
			num: random(1000, 9999)|0,
			text: group +" | "+ match[1]
		});
		dbOrder.save((err)=>{
			mongoose.disconnect();
			if(err) throw err;
			console.log("Object saved: "+ dbOrder)
		})
	});
	console.log('Text message | '+ msg.text)
	console.log('SK: '+match[1]);
}

module.exports.getOrders = function(msg, callback){
	mongoose.connect(uri, (err, cart)=>{
		if (err) throw err;
		models.order.find({owner: msg.from.id}, function (err, ordrs) {
			if (err) throw err;
			callback(ordrs);
			mongoose.disconnect();
		});
	});
}

