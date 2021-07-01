import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as fs from 'fs';
import { UploadImageService } from './upload-image.service';
import configuration from 'src/config/configuration';
import { Response } from 'express';
import * as fileType from 'file-type';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const config = configuration();
    const tmp = config.tmp;
    if (!fs.existsSync(tmp)) {
      fs.mkdirSync(tmp);
    }

    cb(null, tmp);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const upload = await this.uploadImageService.upload(file);
      res.send(upload);
      return res;
    } catch (error) {
      console.error(error);
      return res.status(400).send({ code: 400, message: error.message });
    }
  }

  @Post('compress')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async compress(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const encode = await this.uploadImageService.compress(file);
      const buffer = Buffer.from(encode);
      const type = await fileType.fromBuffer(buffer);
      return res.set('Content-type', type.mime).send(buffer);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ code: 400, message: error.message });
    }
  }
}
