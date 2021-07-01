import * as f from 'file-type';
import * as fs from 'fs';
import * as path from 'path';

import {
  EncodeOptions,
  MozJpegColorSpace,
  MozJpegQuantTable,
  PreprocessOptions,
} from 'src/model/upload-image';

import { ConfigService } from '@nestjs/config';
import { ImagePool } from '@squoosh/lib';
import { Injectable } from '@nestjs/common';
import { UploadImageResponse } from 'src/model/response/upload-image.response';

@Injectable()
export class UploadImageService {
  constructor(private configService: ConfigService) {}

  async upload(file: Express.Multer.File): Promise<UploadImageResponse> {
    const encode = await this.compress(file);
    const fileType = await f.fromFile(file.path);
    const newName = `${file.originalname}-${new Date().getTime()}.${
      fileType.ext
    }`;
    const dest = this.configService.get<string>('dest');
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    const newPath = path.join(this.configService.get<string>('dest'), newName);
    await fs.promises.writeFile(newPath, encode);
    return {
      fileName: file.originalname,
      generateFileName: newName,
      path: newPath,
    };
  }

  async compress(file: Express.Multer.File): Promise<string> {
    const type = await f.fromFile(file.path);
    if (!['png', 'jpg'].includes(type.ext)) {
      throw new Error('This file type is not supported');
    }
    const imagePool = new ImagePool();
    const image = imagePool.ingestImage(file.path);
    await image.decoded;

    const preprocessOptions: PreprocessOptions = {
      // quant: {
      //   enabled: false,
      //   zx: 0,
      //   maxNumColors: 256,
      //   dither: 1,
      // },
    };
    await image.preprocess(preprocessOptions);

    const encodeOptions: EncodeOptions = {
      mozjpeg: {
        quality: 75,
        baseline: false,
        arithmetic: false,
        progressive: true,
        optimize_coding: true,
        smoothing: 0,
        color_space: MozJpegColorSpace.ycbcr,
        quant_table: MozJpegQuantTable.imageMagick,
        trellis_multipass: false,
        trellis_opt_zero: false,
        trellis_opt_table: false,
        trellis_loops: 1,
        auto_subsample: true,
        chroma_subsample: 2,
        separate_chroma_quality: false,
        chroma_quality: 75,
      },
      oxipng: {
        level: 2,
        interlace: false,
      },
    };
    await image.encode(encodeOptions);
    await imagePool.close();

    if (type.ext === 'png') {
      return (await image.encodedWith.oxipng).binary;
    } else {
      return (await image.encodedWith.mozjpeg).binary;
    }
  }
}
