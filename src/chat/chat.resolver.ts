import { Logger, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Context,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/user.service';
import { ChatService } from './chat.service';
import { ChatCreateInput } from './schemas/chat.input';
import { Chat } from './schemas/chat.schema';

@Resolver(() => Chat)
@UseGuards(new AuthGuard())
export class ChatResolver {
  private pubSub: PubSub;
  private logger: Logger;

  constructor(
    private chatService: ChatService,
    private userService: UsersService,
  ) {
    this.pubSub = new PubSub();
    this.logger = new Logger('UserResolver');
  }

  @Query(() => [Chat])
  async getChats(@Context('user') user: User): Promise<Chat[]> {
    return this.chatService.findAll(user);
  }

  @Mutation(() => Chat)
  async createChat(
    @Args('chatCreateData') chatCreateData: ChatCreateInput,
  ): Promise<Chat> {
    return this.chatService.create(chatCreateData);
  }

  @ResolveField(() => [User])
  async resolveMembers(@Parent() chat: Chat) {
    if (chat.members) {
      return chat.members.map((e) => this.userService.findById(e.toString()));
    }
    return [];
  }
}
