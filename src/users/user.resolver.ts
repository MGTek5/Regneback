import { HttpCode, Logger, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from '../auth/auth.guard';
import { UserCreationInput } from './schemas/user.create.input';
import { UserUpdateInput } from './schemas/user.update.input';
import { User } from './schemas/user.schema';
import { UsersService } from './user.service';

@Resolver(() => User)
@UseGuards(new AuthGuard())
export class UsersResolver {
  private pubSub: PubSub;

  private logger: Logger;

  constructor(private userService: UsersService) {
    this.pubSub = new PubSub();
    this.logger = new Logger('UserResolver');
  }

  @HttpCode(200)
  @Query(() => [User])
  async getUsers(): Promise<Array<User>> {
    return this.userService.findAll();
  }

  @HttpCode(200)
  @Query(() => User)
  async getUser(@Args('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @HttpCode(201)
  @Mutation(() => User)
  async createUser(
    @Args('userCreationData') userCreationData: UserCreationInput,
  ): Promise<User> {
    const user = await this.userService.createUser(userCreationData);
    this.logger.log(`created user id ${user._id}`);
    this.pubSub.publish('userCreated', { userCreated: user });
    return user;
  }

  @HttpCode(200)
  @Mutation(() => User)
  async updateUser(
    @Args('userUpdateData') userUpdateData: UserUpdateInput,
  ): Promise<User> {
    const user = await this.userService.updateById(userUpdateData);
    this.logger.log(`updated user with id ${user._id}`);
    this.pubSub.publish('userUpdated', { userUpdated: user });
    return user;
  }

  @HttpCode(200)
  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    const user = await this.userService.deactivateAccount(id);
    this.logger.log(`removed user with id ${id}`);
    this.pubSub.publish('userDeleted', { userDeleted: user });
    return user;
  }

  @Subscription(() => User)
  async userCreated(): Promise<AsyncIterator<User>> {
    return this.pubSub.asyncIterator('userCreated');
  }

  @HttpCode(200)
  @Query(() => User)
  async me(@Context('user') user: User) {
    const d = (
      await this.userService.findById(user._id.toString())
    ).toJSON();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...other } = d;
    return other;
  }
}
