import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserProvider } from '../user/user.model';
import { UserModule } from '../user/user.module';
import { AuthHelperService } from 'src/helper/auth.helper';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [UserProvider, AuthService, AuthHelperService],
})
export class AuthModule {}
