import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreationInput {
  @Field()
    email: string;

  @Field()
    password: string;

  @Field()
    username: string;

  @Field({ defaultValue: false })
    deactivated: boolean;
}
