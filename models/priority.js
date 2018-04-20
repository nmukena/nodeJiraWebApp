var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

var Priority = new Schema({
username: String,
url: String,
project: String,
state: Object
}, { collection: 'priority' });

Priority.plugin(passportLocalMongoose);

module.exports = mongoose.model('Priority', Priority);