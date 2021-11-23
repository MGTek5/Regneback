import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  @InjectModel(Chat.name) private chatModel: Model<Chat>;

  async findAll(): Promise<Chat[]> {
    return await this.chatModel.find();
  }
}
