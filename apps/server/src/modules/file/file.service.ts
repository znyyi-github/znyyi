import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  constructor() {}

  downloadCv(): StreamableFile {
    const filePath = join(process.cwd(), 'public/cv/cv.pdf');
    if (!existsSync(filePath)) {
      // 抛出标准的 NestJS 异常，前端会收到 404 状态码和 JSON 错误信息
      throw new NotFoundException('简历文件不存在，请先上传');
    }
    const file = createReadStream(filePath);
    return new StreamableFile(file, {
      type: 'application/octet-stream',
      disposition: 'attachment; filename="cv.pdf"',
    });
  }
}
