import { Field, InputType } from '@nestjs/graphql';

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
