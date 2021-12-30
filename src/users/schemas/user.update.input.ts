import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserUpdateInput {
  @Field()
    _id: string;

  @Field({ nullable: true })
    email?: string;

  @Field({ nullable: true })
    username?: string;

  @Field({ nullable: true })
    password?: string;

  @Field({ nullable: true })
    profileGif?: string;

  @Field({ defaultValue: false })
    deactivated: boolean;
}
