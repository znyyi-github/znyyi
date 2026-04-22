import { Controller, Get, StreamableFile } from '@nestjs/common';
import { FileService } from './file.service';
import { AuthPublic } from '../auth/auth-data';

@AuthPublic()
@Controller('file')
export class FileController {
  constructor(private readonly cvService: FileService) {}

  @Get('cv')
  downloadCv(): StreamableFile {
    return this.cvService.downloadCv();
  }
}
