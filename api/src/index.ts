import 'express-async-errors';

import path from 'path';

import fallback from '@blocklet/sdk/lib/middlewares/fallback';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv-flow';
import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import prisma from './libs/database';
import HttpException from './libs/exception';
import logger from './libs/logger';
import routes from './routes';
import fileRoute from './routes/file';
import userRoute from './routes/user';

// import { graphqlUserRoute } from './routes/graphql-route';

dotenv.config();

const { name, version } = require('../../package.json');

export const app: express.Application = express();

app.set('trust proxy', true);
app.use(cookieParser());
app.use(express.json({ limit: '1 mb' }));
app.use(express.urlencoded({ extended: true, limit: '1 mb' }));
app.use(cors());

const router = express.Router();
router.use('/api/sys', routes);
router.use('/api/user', userRoute);
router.use('/api/file', fileRoute);

// router.all('/graphql', graphqlUserRoute)
app.use(router);

// 全局异常处理
// eslint-disable-next-line
app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof HttpException) {
    const httpError = err as HttpException;
    res.status(httpError.status).json({ success: false, msg: httpError.message });
  } else {
    res.status(500).json({ success: false, msg: err.message });
  }
});

const isProduction = process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';

if (isProduction) {
  const staticDir = path.resolve(process.env.BLOCKLET_APP_DIR!, 'dist');
  app.use(express.static(staticDir, { maxAge: '30d', index: false }));
  app.use(fallback('index.html', { root: staticDir }));
  // eslint-disable-next-line
  app.use(<ErrorRequestHandler>((err, _req, res, _) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
  }));
}

const port = parseInt(process.env.BLOCKLET_PORT!, 10);

export const server = app.listen(port, async (err?: any) => {
  if (err) throw err;
  await prisma.$connect();
  logger.info(`> ${name} v${version} ready on ${port}`);
});
