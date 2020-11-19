import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost/nestagram-backend',
       { useNewUrlParser: true }
    ),
    UsersModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
