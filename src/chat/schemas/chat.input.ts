import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => [String])
  members: [string];
}

@InputType()
export class ChatUpdateInput {
  @Field(() => String)
  _id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  members?: string[];

  @Field(() => Boolean, { nullable: true })
  private?: boolean;

  @Field(() => Number, { nullable: true })
  lastMessage?: number;
}
