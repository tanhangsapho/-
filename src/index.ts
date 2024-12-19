import express, { Request, Response } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { connectMongoDB, getConfig, logger, logInit } from './utils';
import { TodoResolver } from './graphql/resolvers';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from 'mongoose';
import helmet from 'helmet';
export async function run() {
  try {
    const app = express();

    const config = getConfig(process.env.NODE_ENV);

    logInit({ env: config.env, logLevel: config.logLevel });

    app.use(express.json());
    app.use(cors());

    const mongodb = connectMongoDB.getInstance();
    await mongodb.connect({ url: config.mongoUrl as string });

    app.get('/status', async (req: Request, res: Response) => {
      try {
        const mongooseStatus = mongoose.connection.readyState;
        const isHealthy = mongooseStatus === 1;

        return res.status(isHealthy ? 200 : 503).json({
          status: isHealthy ? 'healthy' : 'unhealthy',
          connection: {
            database: isHealthy ? 'connected' : 'disconnected',
          },
        });
      } catch (error) {
        console.error('Health check failed:', error);

        return res.status(500).json({
          status: 'unhealthy',
          connection: {
            database: 'disconnected',
          },
        });
      }
    });

    // Configure Apollo Server
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [TodoResolver],
        validate: false,
      }),
      introspection: true,
    });

    await apolloServer.start();
    app.use(
      '/graphql',
      cors(),
      express.json(),
      expressMiddleware(apolloServer, {
        context: async ({ req }) => ({
          req,
        }),
      })
    );

    // Start the server
    const server = app.listen(config.port, () => {
      logger.info(`GraphQL Server Listening on Port ${config.port}`);
    });

    const exitHandler = async () => {
      if (server) {
        server.close(async () => {
          logger.info('Server closed!');
          await mongodb.disconnect();
          logger.info('MongoDB disconnected!');
          process.exit(1);
        });
      } else {
        await mongodb.disconnect();
        logger.info('MongoDB disconnected!');
        process.exit(1);
      }
    };

    // Handle errors and signals
    const unexpectedErrorHandler = (error: unknown) => {
      logger.error('Unhandled error', { error });
      exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received');
      if (server) {
        server.close();
      }
    });
    return server;
  } catch (error: unknown | any) {
    logger.error('Failed to initialize application', { error });
    console.log(error.message);
    process.exit(1);
  }
}

run();
