import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost/nestagram-backend',
       { useNewUrlParser: true }
    ),
    UsersModule,
    AuthModule,
    ImagesModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
