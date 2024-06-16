import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() req: { email: string; password: string }) {
    console.log(`Login request for email: ${req.email}`);
    const user = await this.authService.validateUser(req.email, req.password);
    if (!user) {
      console.log('Invalid credentials');
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: User) {
    try {
      const newUser = await this.authService.register(user);
      return newUser;
    } catch (error) {
      throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
