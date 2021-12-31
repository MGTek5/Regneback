import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatCreateInput {
  @Field(() => String)
    name: string;

  @Field(() => [String])
    members: [string];
}
