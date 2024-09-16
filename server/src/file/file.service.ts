import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { resolve } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file): string {
    console.log(type);
    console.log(file.originalname);
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${v4()}.${fileExtension}`;
      const folderPath = resolve(__dirname, '..', 'static', type);
      if (!existsSync(folderPath)) {
        mkdirSync(folderPath, { recursive: true });
      }
      writeFileSync(resolve(folderPath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(fileName: string) {
    console.log(fileName);
  }
}
