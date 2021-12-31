import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { ChatUpdateInput } from './schemas/chat.update.input';
import { ChatCreateInput } from './schemas/chat.create.input';
import { Chat } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  @InjectModel(Chat.name) private ChatModel: Model<Chat>;

  async findAll(user: User): Promise<Chat[]> {
    return this.ChatModel.find({
      $and: [{ members: { $in: [user._id] } }, { private: false }],
    }).sort('-lastMessage');
  }

  async findById(id: string): Promise<Chat> {
    return this.ChatModel.findById(id);
  }

  async create(chatCreateData: ChatCreateInput): Promise<Chat> {
    return this.ChatModel.create({ ...chatCreateData });
  }

  async deleteChat(id: string): Promise<Chat> {
    return this.ChatModel.findByIdAndDelete(id);
  }

  async updateChat(chatUpdateData: ChatUpdateInput): Promise<Chat> {
    const updatedChat = await this.ChatModel.findByIdAndUpdate(
      chatUpdateData._id,
      { $set: chatUpdateData },
      { new: true },
    );

    return updatedChat;
  }
}
