import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Chat } from './chat.schema';

@ObjectType()
@Schema()
export class Message extends Document {
  @Field(() => String)
    _id: Types.ObjectId;

  @Field(() => User)
  @Prop({ type: String, required: true })
    author: Types.ObjectId;

  @Field(() => Chat)
  @Prop({ type: Types.ObjectId, ref: Chat.name })
    chat: Types.ObjectId;

  @Field(() => String)
  @Prop()
    message: string;

  @Field(() => Number)
  @Prop()
    timestamp: number;

  @Field(() => Number)
  @Prop()
    height: number;

  @Field(() => Number)
  @Prop()
    width: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
