import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageCreateInput } from './schemas/message.input';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {
  @InjectModel(Message.name) messageModel: Model<Message>;

  async getMessagesForChat(chatId: string): Promise<Message[]> {
    return await this.messageModel.find({ chat: chatId });
  }

  async createMessage(messageCreateData: MessageCreateInput) {
    return await this.messageModel.create(messageCreateData);
  }
}
