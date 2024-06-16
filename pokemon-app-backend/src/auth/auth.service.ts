import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    console.log(`Validating user with email: ${email}`);
    const user = await this.userService.findByEmail(email);
    if (user) {
      console.log(`Stored password: ${user.password}`);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(`Password valid: ${isPasswordValid}`);
      if (isPasswordValid) {
        return user;
      } else {
        console.log('Invalid password');
      }
    } else {
      console.log('User not found');
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, email: user.email, };
    console.log(`Logging in user with email: ${user.email}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User) {
    try {
      console.log(`Registering user with email: ${user.email}`);
      const hashedPassword = await bcrypt.hash(user.password, 10);
      console.log(`Hashed password: ${hashedPassword}`);
      user.password = hashedPassword;
      return this.userService.create(user);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Registration failed');
    }
  }
}
