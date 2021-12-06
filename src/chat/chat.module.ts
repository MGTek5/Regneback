import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/users/user.module';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { MessageService } from './message.service';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [ChatService, ChatResolver, MessageService],
})
export class ChatModule {}
