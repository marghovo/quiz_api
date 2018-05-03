const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quiz = require("../../models/quiz");

router.get("/", (req, res, next) => {
	Quiz.find()
	.exec()
	.then(docs => {
		console.log(docs);
		res.status(200).json(docs);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.post("/", (req, res, next) => {
	const quiz  = new Quiz({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		body: req.body.body,
		user: req.body.user
	});
	quiz
	.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: "posting a Quiz",
			createdQuiz: result
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.get("/:quizId", (req, res, next) => {
	const id = req.params.quizId;
	Quiz.findById(id)
	.exec()
	.then(doc => {
		console.log(doc);
		res.status(200).json(doc);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
});

router.patch("/:quizId", (req, res, next) => {
	const id = req.params.quizId;
	const updateOps = {};
	for(const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Quiz.update({_id: id}, { $set: updateOps})
	.exec()
	.then(result => {
		console.log(result);
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.delete("/:quizId", (req, res, next) => {
	const id = req.params.quizId;
	Quiz.remove({_id: id})
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

module.exports = router;