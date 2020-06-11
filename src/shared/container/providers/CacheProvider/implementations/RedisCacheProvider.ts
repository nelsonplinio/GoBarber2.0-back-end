import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

import ICacheProvider from '../models/ICacheProvider';
import ISaveCacheDTO from '../dtos/ISaveCacheDTO';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    const { redis: redisConfig } = cacheConfig.config;
    this.client = new Redis(redisConfig);
  }

  public async save({ key, value }: ISaveCacheDTO): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach(key => pipeline.del(key));

    await pipeline.exec();
  }
}
