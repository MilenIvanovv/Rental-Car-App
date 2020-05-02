import { Injectable } from '@nestjs/common';
import Jimp from 'jimp';
import { FsService } from './fs/fs.service';
import { heightRes } from '../common/car-image-formats';

@Injectable()
export class JimpService {

  constructor(private readonly fsService: FsService) {}

  async resizeImg(imgBase64, width, height): Promise<Buffer> {
    const img: any = await new Promise((res, rej) => {
      // open a file called "lenna.png"
      Jimp.read(imgBase64, (err, data) => {
        if (err) throw err;

        res(data);
      });
    })

    return await img
      .resize(width, height)
      .getBufferAsync(Jimp.AUTO);
  }

  async findImage(name, width, height): Promise<string> {
    const imageName = `${name} - ${width}x${height}.jpg`;
    const imageNameMaxRes = `${name} - ${heightRes.width}x${heightRes.height}.jpg`;
    const pathForResponse = 'database/seed/car-images';
    const path = `./src/${pathForResponse}`;

    const fileNames = await this.fsService.readFileNames(path);

    if (fileNames.includes(imageName)) {
      return `${pathForResponse}/${imageName}`;
    }

    const maxResImage = await this.fsService.readFile(`${path}/${imageNameMaxRes}`);
    const imageBuffer: any = await new Promise((resolve, rej) => {
      Jimp.read(maxResImage, (err, data) => {
        if (err) throw err;

        resolve(data);
      });
    })

    await imageBuffer.resize(width, height).write(`${path}/${imageName}`);

    return `${pathForResponse}/${imageName}`;
  }
}
