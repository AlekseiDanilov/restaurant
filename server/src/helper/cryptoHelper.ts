import uuidv1 = require('uuid/v1');
import sha1 = require('sha1');

export class CryptoHelper {
  static randomUuid(): string {
    return uuidv1()
      .replace(new RegExp('-', 'g'), '');
  }

  static sha1(message: string): string {
    return sha1(message);
  }

  static equalSha1(hash: string, message: string): boolean {
    return hash === sha1(message);
  }
}