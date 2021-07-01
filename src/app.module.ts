import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UploadImageModule } from './api/upload-image/upload-image.module';
import configuration from './config/configuration';

@Module({
  imports: [
    UploadImageModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
