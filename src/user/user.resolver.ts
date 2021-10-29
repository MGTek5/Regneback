import { Logger } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserCreationInput, UserUpdateInput } from './schema/user.input';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  private pubSub: PubSub;
  private logger: Logger;

  constructor(private userService: UserService) {
    this.pubSub = new PubSub();
    this.logger = new Logger('UserResolver');
  }

  @Query(() => [User])
  async getUsers(): Promise<Array<User>> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('userCreationData') userCreationData: UserCreationInput,
  ): Promise<User> {
    const user = await this.userService.create(userCreationData);
    this.logger.log(`created user id ${user._id}`);
    this.pubSub.publish('userCreated', { userCreated: user });
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userUpdateData') update: UserUpdateInput,
  ): Promise<User> {
    const user = await this.userService.updateById(update._id, update);
    this.logger.log(`updated user with id ${user._id}`);
    this.pubSub.publish('userUpdated', { userUpdated: user });
    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    const user = await this.userService.deleteById(id);
    this.logger.log(`removed user with id ${id}`);
    this.pubSub.publish('userDeleted', { userDeleted: user });
    return user;
  }

  @Query(() => User)
  async me(@Context('user') user: User) {
    const d = await this.userService.findById(user._id.toString());
    delete d.password;
    return d;
  }
}
