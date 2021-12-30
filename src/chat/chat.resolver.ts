import { Logger, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Context,
  Mutation,
  Args,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/user.service';
import { ChatService } from './chat.service';
import { ChatUpdateInput } from './schemas/chat.update.input';
import { ChatCreateInput } from './schemas/chat.create.input';
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
    this.logger = new Logger('ChatResolver');
  }

  @Query(() => [Chat])
  async getChats(@Context('user') user: User): Promise<Chat[]> {
    return this.chatService.findAll(user);
  }

  @Mutation(() => Chat)
  async createChat(
    @Args('chatCreateData') chatCreateData: ChatCreateInput,
  ): Promise<Chat> {
    const chat = await this.chatService.create(chatCreateData);
    this.logger.log(`chat ${chat._id} created`);
    this.pubSub.publish('chatCreated', { chatCreated: chat });
    return chat;
  }

  @Mutation(() => Chat)
  async deleteChat(@Args('id') id: string): Promise<Chat> {
    const chat = await this.chatService.findById(id);
    this.logger.log(`chat ${id} deleted`);
    this.pubSub.publish('chatDeleted', { chatDeleted: chat });
    return chat;
  }

  @Mutation(() => Chat)
  async updateChat(
    @Args('chatUpdateDate') chatUpdateData: ChatUpdateInput,
  ): Promise<Chat> {
    const d = await this.chatService.updateChat(chatUpdateData);
    this.logger.log(`chat ${chatUpdateData._id} updated`);
    this.pubSub.publish('chatUpdated', { chatUpdated: d });
    return d;
  }

  @Subscription(() => Chat, {
    filter: (payload, variables, context) => (
      payload.chatCreated?.members.includes(context.user._id)
    ),
  })
  async chatCreated(): Promise<AsyncIterator<Chat, any, undefined>> {
    return this.pubSub.asyncIterator('chatCreated');
  }

  @Subscription(() => Chat, {
    filter: (payload, variables, context) => (
      payload.chatUpdated?.members.includes(context.user._id)
    ),
  })
  async chatUpdated(): Promise<AsyncIterator<Chat, any, undefined>> {
    return this.pubSub.asyncIterator('chatUpdated');
  }

  @Subscription(() => Chat, {
    filter: (payload, variables, context) => (
      payload.chatUpdated?.members.includes(context.user._id)
    ),
  })
  async chatDeleted(): Promise<AsyncIterator<Chat, any, undefined>> {
    return this.pubSub.asyncIterator('chatDeleted');
  }

  @ResolveField('members', () => [User])
  async resolveMembers(@Parent() chat: Chat) {
    if (chat.members) {
      return chat.members.map((e) => this.userService.findById(e.toString()));
    }
    return [];
  }
}
