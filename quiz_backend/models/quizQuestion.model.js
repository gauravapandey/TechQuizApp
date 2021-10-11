const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizQuestionsSchema = new Schema({
    question: { type: String, required: true },
    questionSetId: { type: String, required: true },
    answerOption: { 
        a: { type: String, required: true },
        b: { type: String, required: true },
        c: { type: String, required: true },
        d: { type: String, required: true }
    },
    correctAnswer: { type: String, required: true },
});

const questionData = mongoose.model('questions' , quizQuestionsSchema);

module.exports = questionData;