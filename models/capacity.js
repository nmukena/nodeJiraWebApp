var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

var Capacity = new Schema({
username: String,
url: String,
project: String,
state: Object
}, { collection: 'capacity' });

Capacity.plugin(passportLocalMongoose);

module.exports = mongoose.model('Capacity', Capacity);