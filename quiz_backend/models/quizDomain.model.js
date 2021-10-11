const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizDomainSchema = new Schema({
    domainLabel: { type: String, required: true },
    questionSetId: { type: String, required: true }
});

const domainData = mongoose.model('domain' , quizDomainSchema);

module.exports = domainData;