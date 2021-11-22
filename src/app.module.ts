import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {MongooseModule} from "@nestjs/mongoose"
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGO}/regnessem`),
    GraphQLModule.forRoot({debug:true, playground:true, autoSchemaFile:true, installSubscriptionHandlers:true}),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
