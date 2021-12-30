import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: true })
    email?: string;

  @Field(() => String, { nullable: true })
    username?: string;

  @Field()
    password: string;
}
