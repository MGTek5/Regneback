import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessageCreateInput {
  @Field()
  message: string;
  @Field()
  author: string;
  @Field()
  chat: string;
  @Field()
  height: number;
  @Field()
  width: number;
}

export class MessageDeleteInput {
  @Field()
  _id: string;
}
