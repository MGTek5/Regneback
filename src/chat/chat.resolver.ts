import { Logger } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/user.service';
import { ChatService } from './chat.service';
import { Chat } from './schemas/chat.schema';

@Resolver(() => Chat)
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
  async getChats(): Promise<Chat[]> {
    return this.chatService.findAll();
  }

  @ResolveField(() => [User])
  async resolveMembers(@Parent() chat: Chat) {
    if (chat.members) {
      return chat.members.map((e) => this.userService.findById(e.toString()));
    }
    return [];
  }
}
