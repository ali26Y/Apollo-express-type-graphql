import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { graphqlUploadExpress } from "graphql-upload";
import queryComplexity, { fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity'
// import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
import cors from 'cors';

import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import { formatErrors } from './utils/formatErrors';
import { createSchema } from './utils/createSchema';

require('dotenv').config();

const main = async () => {
    
    await createConnection();

    const schema = await createSchema();

    const apolloServer = new ApolloServer({ 
        schema, 
        formatError: formatErrors,
        context: ({ req, res }: any) => ({ req, res }),
        uploads: false,
        validationRules: [
            queryComplexity({
                maximumComplexity: 300,
                variables: {},
                onComplete: (complexity: number) => {
                    console.log('Query Complexity:', complexity);
                },
                estimators: [
                    // Configure your estimators
                    fieldExtensionsEstimator(),
                    simpleEstimator({
                        defaultComplexity: 1
                    })
                ],
            })
        ]
    })

    const app = Express();

    let RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials: true,
            origin: 'http://localhost:3000'
        })
    );

    app.use(
        session({
            store: new RedisStore({
                client: new Redis() as any,
            }),
            name: 'qid',
            secret: process.env.REDIS_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
            },
        } as any)
    );

    app.use(graphqlUploadExpress({ maxFileSize: 100000000000, maxFiles: 10 }));

    apolloServer.applyMiddleware({ 
        app, 
    });

    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql');
    })
}

main();
