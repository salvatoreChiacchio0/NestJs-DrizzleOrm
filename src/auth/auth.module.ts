import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JWT_CONSTANT } from '../../constants';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANT,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
