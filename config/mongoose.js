var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatbot');

module.exports = function() {
	//var db = mongoose.connection;
	mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

	mongoose.connection.on('open', function() {
	  // we're connected!
	  console.log("We are connected ")
	});
	return mongoose;
}