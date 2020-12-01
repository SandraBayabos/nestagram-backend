import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './interfaces/image.interface'

@Injectable()
export class ImagesService {
  constructor(@InjectModel('Image') private readonly imageModel: Model<Image>) {}

  
}
