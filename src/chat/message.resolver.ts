import { Logger, UseGuards } from '@nestjs/common';
import {
  Args,
  Resolver,
  Query,
  Mutation,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/user.service';
import { AuthGuard } from '../auth/auth.guard';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';
import { Chat } from './schemas/chat.schema';
import { MessageCreateInput } from './schemas/message.input';
import { Message } from './schemas/message.schema';

@Resolver(() => Message)
@UseGuards(new AuthGuard())
export class MessageResolver {
  private pubSub: PubSub;
  private logger: Logger;

  constructor(
    private messageService: MessageService,
    private chatService: ChatService,
    private userService: UsersService,
  ) {
    this.pubSub = new PubSub();
    this.logger = new Logger('MessageResolver');
  }

  @Query(() => [Message])
  async getMessages(@Args('chatId') chatId: string) {
    return await this.messageService.getMessagesForChat(chatId);
  }

  @Mutation(() => Message)
  async createMessage(
    @Args('messageCreateData') messageCreateData: MessageCreateInput,
  ) {
    const m = await this.messageService.createMessage(messageCreateData);
    this.logger.log(`created message ${m._id}`);
    this.pubSub.publish('messageCreated', m);
    return m;
  }

  @Subscription(() => Message)
  async onMessageCreated(): Promise<AsyncIterator<Message, any, undefined>> {
    return this.pubSub.asyncIterator('messageCreated');
  }

  @ResolveField('chat', () => Chat)
  async resolveChat(@Parent() parent: Message) {
    this.chatService.findById(parent.chat.toString());
  }

  @ResolveField('author', () => User)
  async resolveAuthor(@Parent() parent: Message) {
    return await this.userService.findById(parent.author.toString());
  }
}
