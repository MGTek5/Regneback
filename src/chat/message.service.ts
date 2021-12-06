import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {
  @InjectModel(Message.name) messageModel: Model<Message>;

  async getMessagesForChat(chatId: string) {
    return await this.messageModel.find({ chat: chatId });
  }
}
