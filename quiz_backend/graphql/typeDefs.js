const { gql} = require('apollo-server-express');

const typeDefs = gql`

    type Domain {
        id: ID,
        domainLabel: String,
        questionSetId: String
    }

    type AnswerOption {
        a: String,
        b: String,
        c: String,
        d: String
    }

    type Question {
        id: ID,
        question: String,
        questionSetId: String,
        answerOption: AnswerOption,
        correctAnswer: String
    }

    type Query {
        domainData: [Domain]

        questionData: [Question]

        getQuestionSet(setId: String): [Question]
    }

    input domainInput {
        domainLabel: String,
        questionSetId: String
    }

    input answerOptionInput {
        a: String,
        b: String,
        c: String,
        d: String
    }

    input questionInput {
        question: String,
        questionSetId: String,
        answerOption: answerOptionInput,
        correctAnswer: String
    }

    type Mutation {
        addDomainData(domain: domainInput): Domain
        addQuestionData(question: questionInput): Question
    }
`;

module.exports = typeDefs;