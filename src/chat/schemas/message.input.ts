import { Field } from '@nestjs/graphql';

export class MessageDeleteInput {
  @Field()
    _id: string;
}
