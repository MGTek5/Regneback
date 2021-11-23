import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/users/user.module';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from './schemas/chat.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  providers: [ChatService, ChatResolver],
})
export class ChatModule {}
