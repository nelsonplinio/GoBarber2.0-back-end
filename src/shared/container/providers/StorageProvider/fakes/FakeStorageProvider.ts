import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const index = this.storage.findIndex(fileFind => fileFind === file);
    this.storage.splice(index, 1);
  }
}

export default DiskStorageProvider;
