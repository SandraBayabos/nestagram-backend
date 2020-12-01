import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost/nestagram-backend',
       { useNewUrlParser: true },
    ),
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    UsersModule,
    AuthModule,
    ImagesModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
