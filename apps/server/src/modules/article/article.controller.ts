import { Controller, Get, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ResponseDataImpl } from '../../common/response-data';
import { AuthPublic } from '../auth/auth-data';

@AuthPublic()
@Controller('art')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('all')
  async getAll() {
    const data = await this.articleService.getAllArticles();
    return new ResponseDataImpl(data);
  }

  @Get('detail/:id')
  async getDetail(@Param('id') id: string) {
    const data = await this.articleService.getArticleDetail(id);
    if (!data) {
      return ResponseDataImpl.buildFailure('Article not found');
    }
    return new ResponseDataImpl(data);
  }

  @Get('md/:id')
  async getMarkdown(@Param('id') id: string) {
    const content = await this.articleService.getArticleMarkdown(id);
    if (content === null) {
      return ResponseDataImpl.buildFailure('Markdown not found');
    }
    return new ResponseDataImpl(content);
  }

  @Get('hot')
  async getHot() {
    const data = await this.articleService.getHotArticles();
    return new ResponseDataImpl(data);
  }
}
