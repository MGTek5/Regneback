import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatCreateInput {
  @Field()
  name: string;

  @Field()
  members: [string];
}
