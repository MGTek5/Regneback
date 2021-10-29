import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserCreationInput, UserUpdateInput } from './schema/user.input';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  @InjectModel(User.name) private userModel: Model<User>;

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string) {
    return await this.userModel.find({ email }).exec();
  }

  async create(data: UserCreationInput) {
    const user = new this.userModel({
      ...data,
      password: bcrypt.hashSync(data.password, 12),
    });
    return user.save();
  }

  async updateById(id: string, data: UserUpdateInput) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException();

    const newData = { ...user, ...data };
    if (data.password) {
      newData.password = bcrypt.hashSync(data.password, 12);
    }
    return this.userModel.findByIdAndUpdate(id, newData);
  }

  async deleteById(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
