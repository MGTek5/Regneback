import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@ObjectType()
@Schema()
export class Chat extends Document {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Field(() => [User])
  @Prop({ default: [], nullable: true, type: Types.ObjectId, ref: User.name })
  members: [Types.ObjectId];

  @Field(() => Boolean)
  @Prop({ default: false })
  private: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
