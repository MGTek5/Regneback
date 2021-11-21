import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './schemas/auth.input';
import { AuthDetails } from './schemas/auth.schema';

@Resolver()
export class AuthResolver {
  private logger: Logger;
  private pubSub: PubSub;
  constructor(private authService: AuthService) {
    this.logger = new Logger('AuthResolver');
    this.pubSub = new PubSub();
  }

  @Mutation(() => AuthDetails)
  async register(
    @Args('registerData') registerData: RegisterInput,
  ): Promise<AuthDetails> {
    return await this.authService.register(registerData);
  }

  @Mutation(() => AuthDetails)
  async login(@Args('loginData') loginData: LoginInput): Promise<AuthDetails> {
    return await this.authService.login(loginData);
  }
}