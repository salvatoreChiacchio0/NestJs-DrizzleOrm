import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService],
  imports: [DrizzleModule],

  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
