import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Db } from './db/db';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, Db],
  controllers: [AppController],
  providers: [AppService, Db],
})
export class AppModule {}
