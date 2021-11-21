import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/schemas/user.schema';

@ObjectType()
export class AuthDetails {
  @Field()
  access_token: string;

  @Field()
  user: User;
}