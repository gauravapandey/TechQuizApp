const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
// const userRouter = require('./routes/users');
// const newsRouter = require('./routes/news');
// const authRouter = require('./routes/auth');

require('dotenv').config();
const port = process.env.PORT || 8888;

const startServer = async () => {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })
    await apolloServer.start();

    apolloServer.applyMiddleware({ app: app });

    app.use(cors());
    app.use(express.json());

    const uri = process.env.DB_URI;
    mongoose.connect( uri , { useNewUrlParser: true, useUnifiedTopology: true });

    const connection = mongoose.connection;
    connection.once('open' , () => {
        console.log("MongoDB database connection established")
    });

    app.listen(port, () => {
        console.log(`serever is running on ${port}`);
    });
}

startServer();