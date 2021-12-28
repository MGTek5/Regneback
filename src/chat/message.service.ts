import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatService } from './chat.service';
import { MessageCreateInput } from './schemas/message.input';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {
  @InjectModel(Message.name) messageModel: Model<Message>;

  constructor(private chatService: ChatService) { }

  async getMessagesForChat(chatId: string): Promise<Message[]> {
    return await this.messageModel.find({ chat: chatId }).sort("timestamp");
  }

  async createMessage(messageCreateData: MessageCreateInput) {
    const m = await this.messageModel.create({ ...messageCreateData, timestamp: +new Date() });
    await this.chatService.updateChat({ lastMessage: +new Date(), _id: messageCreateData.chat });
    return m;
  }
}
