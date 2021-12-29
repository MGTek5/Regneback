import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { UserCreationInput, UserUpdateInput } from './schemas/user.input';

@Injectable()
export class UsersService {
  @InjectModel(User.name) private userModel: Model<User>;

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find({ deactivated: false }).exec();
  }
  async findOne(query: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(query).exec()
  }
  async createUser(data: UserCreationInput): Promise<User> {
    const user = new this.userModel({
      ...data,
      password: bcrypt.hashSync(data.password, 12),
    });
    return user.save();
  }
  async desactivateAccount(id: string): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, { $set: { deactivated: true } });
  }
  async updateById(data: UserUpdateInput): Promise<User> {
    const newData = { ...data };
    if (newData.password) {
      newData.password = bcrypt.hashSync(data.password, 12);
    }
    return await this.userModel.findByIdAndUpdate(data._id, newData, {
      new: true,
    });
  }
}