import ICacheProvider from '../models/ICacheProvider';
import ISaveCacheDTO from '../dtos/ISaveCacheDTO';

interface IFakeCacheObject {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: IFakeCacheObject = {};

  public async save({ key, value }: ISaveCacheDTO): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key] || null;

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    Object.keys(this.cache)
      .filter(key => key.startsWith(`${prefix}:`))
      .forEach(key => {
        delete this.cache[key];
      });
  }
}
