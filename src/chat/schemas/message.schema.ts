import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Chat } from './chat.schema';

@ObjectType()
@Schema()
export class Message extends Document {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: String, required: true })
  author: Types.ObjectId;

  @Field(() => [Chat])
  @Prop({ type: Types.ObjectId, ref: User.name })
  chat: Types.ObjectId;

  @Field(() => String)
  @Prop()
  messages: string;
}
