import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './interfaces/image.interface'
import * as AWS from 'aws-sdk';
import { ConfigService } from 'nestjs-config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ImagesService {
  constructor(
  @InjectModel('Image') 
  private readonly imageModel: Model<Image>,
  private readonly configService: ConfigService
  ) {}

  async upload(file: any) {
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
}
