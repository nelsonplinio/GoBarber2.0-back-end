import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';

import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(rateLimiter);

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadFolder));

app.use(routes);

app.use(errors());

/** Global Error Handler */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.error(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀Server started on port 3333 !');
});
