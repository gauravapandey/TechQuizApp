const domainModel = require('../models/quizDomain.model');
const questionModel = require('../models/quizQuestion.model');

const resolvers = {
    Query: {
        domainData: async () => {
            const data = await domainModel.find();
            return data;
        },
        questionData: async () => {
            const data = await questionModel.find();
            return data;
        },
        getQuestionSet: async(parent, args, context, info) => {
            return await questionModel.find({
                questionSetId: args.setId
            })
        }
    },

    Mutation: {
        addDomainData: async (parent, args, context, info) => {
            const { domainLabel, questionSetId } = args.domain;
            const newDomain = new domainModel({ domainLabel, questionSetId });
            await newDomain.save();
            return newDomain
        },
        addQuestionData: async (parent, args, context, info) => {
            const newQuestionSet = new questionModel(args.question);
            await newQuestionSet.save();
            return newQuestionSet
        }
    }
}

module.exports = resolvers;