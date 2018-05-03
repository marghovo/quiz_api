const mongoose = require("mongoose");
const quizSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId, 
	name: String,
	body: String,
	user: String
});

module.exports = mongoose.model("Quiz", quizSchema);