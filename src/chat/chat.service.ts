import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { ChatCreateInput, ChatUpdateInput } from './schemas/chat.input';
import { Chat } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  @InjectModel(Chat.name) private chatModel: Model<Chat>;

  async findAll(user: User): Promise<Chat[]> {
    return await this.chatModel.find({
      $and: [{ members: { $in: [user._id] } }, { private: false }],
    });
  }

  async create(chatCreateData: ChatCreateInput): Promise<Chat> {
    return await this.chatModel.create({ ...chatCreateData });
  }

  async deleteChat(id: string): Promise<string> {
    return (await this.chatModel.findByIdAndDelete(id))._id.toString();
  }

  async updateChat(chatUpdateData: ChatUpdateInput): Promise<Chat> {
    const updatedChat = await this.chatModel.findByIdAndUpdate(
      chatUpdateData._id,
      chatUpdateData,
      { new: true },
    );

    return updatedChat;
  }
}
