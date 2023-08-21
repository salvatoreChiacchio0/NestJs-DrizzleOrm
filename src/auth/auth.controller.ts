import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from '../helpers/auth.guard';
  import { AuthService } from './auth.service';
import { Public } from 'src/helpers/public-route.decorator';
import { User } from 'src/drizzle/schema';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @Post('login')
    signIn(@Body() signInDto: User) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
  
   
  }