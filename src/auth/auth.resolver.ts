import {
  Args, Mutation, Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './schemas/auth.login.input';
import { RegisterInput } from './schemas/auth.register.input';
import { AuthDetails } from './schemas/auth.schema';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Mutation(() => AuthDetails)
  async register(
    @Args('registerData') registerData: RegisterInput,
  ): Promise<AuthDetails> {
    return this.authService.register(registerData);
  }

  @Mutation(() => AuthDetails)
  async login(@Args('loginData') loginData: LoginInput): Promise<AuthDetails> {
    return this.authService.login(loginData);
  }
}
