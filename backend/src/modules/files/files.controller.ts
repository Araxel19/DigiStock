import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

@Controller('uploads')
export class FilesController {
  @Get(':folder/:filename')
  getFile(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const filePath = join('/app/uploads', folder, filename);

    try {
      statSync(filePath);
      const file = createReadStream(filePath);
      file.pipe(res);
    } catch (error) {
      res.status(404).send('File not found');
    }
  }
}
