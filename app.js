const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const QuizRoutes = require("./api/routes/quizzes");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/quizzes", QuizRoutes);

mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-3qmkv.mongodb.net:27017,cluster0-shard-00-01-3qmkv.mongodb.net:27017,cluster0-shard-00-02-3qmkv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");

app.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});

module.exports = app;