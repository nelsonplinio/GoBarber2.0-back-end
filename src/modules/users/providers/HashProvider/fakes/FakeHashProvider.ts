import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  generateHash(payload: string): Promise<string> {
    return new Promise(resolve => resolve(payload));
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return new Promise(resolve => resolve(payload === hashed));
  }
}
