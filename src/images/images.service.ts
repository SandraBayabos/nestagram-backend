import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './interfaces/image.interface'
import * as AWS from 'aws-sdk';
import { ConfigService } from 'nestjs-config';
import { v4 as uuid } from 'uuid';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(
  @InjectModel('Image') 
  private readonly imageModel: Model<Image>,
  private readonly configService: ConfigService
  ) {}

  async uploadFile(file: any) {
    const s3 = new AWS.S3();
    AWS.config.update({
      accessKeyId: this.configService.get('configuration').awsKey,
      secretAccessKey: this.configService.get('configuration').awsSecretKey
    });
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('configuration').awsBucketName,
      Body: file.buffer,
      Key: `${uuid()}-${file.originalName}`,
      ACL: 'public-read',
      ContentType: file.mimetype
    })
    .promise();
    return uploadResult.Location
  }

  async create(userId: string, createImageDto: CreateImageDto, file: any) {
    const image = await this.uploadFile(file);
    createImageDto.userId = userId;
    createImageDto.imageUrl = image;
    const newImage = new this.imageModel(createImageDto);
    return await newImage.save();
  }

  async findAll(userId: string): Promise<Image[]> {
    const images = await this.imageModel.find({userId: userId});
    return images;
  }

  async delete(userId: string, id: string): Promise<Image> {
    const image = await this.imageModel.findOne({ _id: id });
    if(!image) {
      throw new HttpException('Image not found', HttpStatus.BAD_REQUEST);
    }
    if(image.userId !== userId) {
      throw new HttpException('You are not allowed to perform this action!', HttpStatus.UNAUTHORIZED)
    }
    const deletedImage = await this.imageModel.findByIdAndRemove(id);
    return deletedImage;
  }
}
