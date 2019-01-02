import uuidv1 = require('uuid/v1');
import md5 = require('md5');

export class CryptoHelper {
  static randomUuid(): string {
    return uuidv1()
      .replace(new RegExp('-', 'g'), '');
  }

  static md5(message: string): string {
    return md5(message);
  }

  static equalMd5(hash: string, message: string): boolean {
    return hash === md5(message);
  }
}