import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD || undefined,
  port: Number(process.env.REDIS_PORT),
  enable_offline_queue: false,
});

const limitter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rate-limiter-middleware',
  points: 10, // 10 requests
  duration: 1, // per 1s by IP
  blockDuration: 20, // 20 seconds blocked
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limitter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError('Too many request', 429);
  }
}
