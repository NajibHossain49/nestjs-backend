import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    try {
      const user = await this.userService.register(body.username, body.password);
      return { message: 'User registered successfully', user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const token = await this.authService.validateUser(body.username, body.password);
    if (!token) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return { access_token: token };
  }
}
