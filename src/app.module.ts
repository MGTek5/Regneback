import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';

const MODULES = [
  MongooseModule.forRoot(`mongodb://${process.env.MONGO}/regnessem`),
  GraphQLModule.forRoot({
    installSubscriptionHandlers: true,
    autoSchemaFile: true,
    context: ({ req, connection }) => ({
      headers: req?.headers || connection.context.headers,
    }),
  }),
  UserModule,
];

@Module({
  imports: MODULES,
  controllers: [AppController]
})
export class AppModule {}
