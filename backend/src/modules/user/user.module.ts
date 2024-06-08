import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProvider } from './user.model';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserProvider],
  exports: [UserService, UserProvider],
})
export class UserModule {}
