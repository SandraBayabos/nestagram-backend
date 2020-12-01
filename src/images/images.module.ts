import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ImageSchema } from './schemas/image.schema';

@Module({
  imports: [
    // making the Image schema injectable
    MongooseModule.forFeature([{name: 'Image', schema: ImageSchema}])
  ],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
