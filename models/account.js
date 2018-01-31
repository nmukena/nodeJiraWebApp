var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
username: String,
url: String,
project: String,
state: Object
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);