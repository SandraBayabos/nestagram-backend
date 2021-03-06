import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema'

/*
forFeature() method configures the module & defines which models should be registered in the current scope
*/
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  // UsersService needs to be exported so that it is visible outside this module
  exports: [UsersService]
})
export class UsersModule {}
