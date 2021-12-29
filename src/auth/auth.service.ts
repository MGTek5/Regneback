import { UsersService } from '../users/user.service';
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { AuthDetails } from './schemas/auth.schema';
import { LoginInput, RegisterInput } from './schemas/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser({
    email,
    username,
    password,
  }: LoginInput): Promise<User | null> {
    const credential = email || username;
    if (!credential) throw new BadRequestException();
    const user = await this.usersService.findOne({
      $and: [
        { $or: [{ email: credential }, { username: credential }] },
        { desactivated: false }
      ]
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
  async login(data: LoginInput): Promise<AuthDetails> {
    const payload = await this.validateUser(data);
    if (payload) {
      return {
        access_token: this.generateToken(payload),
        user: payload,
      };
    }
    throw new BadRequestException('Something went wrong');
  }
  async register({
    email,
    username,
    password,
  }: RegisterInput): Promise<AuthDetails> {
    try {
      const user = await this.usersService.createUser({
        email,
        password,
        username,
        desactivated: false
      });
      return {
        access_token: this.generateToken(user),
        user,
      };
    } catch {
      throw new BadRequestException('User already exists');
    }
  }

  private generateToken(user: User): string {
    return this.jwtService.sign(
      {
        ...user.toJSON(),
        type: 'user',
      },
      {
        secret: process.env.SECRET || 'sting-sell-pioneer',
      },
    );
  }
}