import { Injectable } from '@nestjs/common';
import Jimp from 'jimp';

@Injectable()
export class JimpService {
  async resizeImg(imgBase64, width, height): Promise<string> {
     const img: any = await new Promise((res, rej) => {
      // open a file called "lenna.png"
      Jimp.read(Buffer.from(imgBase64, 'base64'), (err, data) => {
        if (err) throw err;

        res(data);
      });
    })

    const a = await img.resize(width, height)
    .getBase64Async(Jimp.AUTO);

    return a;
  }
}
