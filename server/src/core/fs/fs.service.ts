import { Injectable } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class FsService {

  readFileNames(path): Promise<string[]> {
    return new Promise((res, rej) =>
    fs.readdir(path, (err, filenames) => {
      if (err) {
        rej(err)
      }

      res(filenames);
    }));
  }

  async readFile(path): Promise<Buffer> {
    return new Promise((res, rej) => 
       fs.readFile(path, (err, data) => {
         if (err) {
           rej(err);
         }

         res(data);
       })
    )
  }
}
