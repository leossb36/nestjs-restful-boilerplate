import * as fs from 'fs';
import * as path from 'path';

export class FileHelper {
  static async writeFile(
    file: Express.Multer.File,
    destination: string,
    filename: string,
  ): Promise<string> {
    const filePath = path.join(destination, filename);

    return new Promise<string>((resolve, reject) => {
      const base64Data = file.buffer.toString('base64');
      fs.writeFile(filePath, base64Data, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(filePath);
      });
    });
  }
}
