import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { UserCreationInput } from './schemas/user.create.input';
import { UserUpdateInput } from './schemas/user.update.input';

@Injectable()
export class UsersService {
  @InjectModel(User.name) private UserModel: Model<User>;

  async findById(id: string): Promise<User> {
    return this.UserModel.findById(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.UserModel.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async findOne(query: FilterQuery<User>): Promise<User> {
    return this.UserModel.findOne(query).exec();
  }

  async createUser(data: UserCreationInput): Promise<User> {
    const user = new this.UserModel({
      ...data,
      password: bcrypt.hashSync(data.password, 12),
    });
    return user.save();
  }

  async deleteById(id: string): Promise<User> {
    return this.UserModel.findByIdAndDelete(id);
  }

  async updateById(data: UserUpdateInput): Promise<User> {
    const newData = { ...data };
    if (newData.password) {
      newData.password = bcrypt.hashSync(data.password, 12);
    }
    return this.UserModel.findByIdAndUpdate(data._id, newData, {
      new: true,
    });
  }
}
