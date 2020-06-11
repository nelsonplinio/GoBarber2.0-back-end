import ISaveCacheDTO from '../dtos/ISaveCacheDTO';

export default interface ICacheProvider {
  save(data: ISaveCacheDTO): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}
