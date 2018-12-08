import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'API IS READY :)';
  }
}
