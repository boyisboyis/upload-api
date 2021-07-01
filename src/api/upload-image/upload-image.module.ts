import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UploadImageController } from './upload-image.controller';
import { UploadImageService } from './upload-image.service';

@Module({
  imports: [ConfigModule],
  controllers: [UploadImageController],
  providers: [UploadImageService],
})
export class UploadImageModule {}
