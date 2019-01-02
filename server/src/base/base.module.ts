import {Module} from '@nestjs/common';
import {BaseService} from './base.service';
import {Db} from '../db/db';

@Module({
  providers: [BaseService, Db],
  exports: [BaseService]
})
export class BaseModule {
}
