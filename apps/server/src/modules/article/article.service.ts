import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ObjectId } from 'mongodb';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async getAllArticles() {
    return await this.articleRepository.find({
      order: { pv: 'DESC' },
    });
  }

  async getArticleDetail(id: string) {
    const article = await this.articleRepository.findOneBy({
      _id: new ObjectId(id) as any,
    });
    if (article) {
      article.pv += 1;
      await this.articleRepository.save(article);
    }
    return article;
  }

  async getHotArticles() {
    return await this.articleRepository.find({
      order: { pv: 'DESC' },
      take: 3,
    });
  }

  async getArticleMarkdown(id: string) {
    const article = await this.articleRepository.findOneBy({
      _id: new ObjectId(id) as any,
    });
    if (!article || !article.md) {
      return null;
    }

    const markdownPath = join(process.cwd(), 'public', article.md);
    if (!existsSync(markdownPath)) {
      return null;
    }

    const source = readFileSync(markdownPath, 'utf-8');
    const { metadata, content } = this.parseFrontmatter(source);
    return { markdown: content, meta: metadata };
  }

  private parseFrontmatter(markdown: string) {
    type FrontmatterScalar = string | number | boolean;
    type FrontmatterValue = FrontmatterScalar | FrontmatterValue[];

    const metadata: Record<string, FrontmatterValue> = {};
    const frontmatterMatch = markdown.match(
      /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/,
    );
    if (!frontmatterMatch) {
      return { metadata, content: markdown };
    }

    const rawFrontmatter = frontmatterMatch[1];
    const lines = rawFrontmatter.split(/\r?\n/);
    let currentKey: string | null = null;

    const parseValue = (value: string): FrontmatterValue => {
      const trimmedValue = value.trim();
      if (/^(true|false)$/.test(trimmedValue)) {
        return trimmedValue === 'true';
      }
      if (/^-?\d+$/.test(trimmedValue)) {
        return Number(trimmedValue);
      }
      if (/^-?\d+\.\d+$/.test(trimmedValue)) {
        return Number(trimmedValue);
      }
      if (/^\[(.*)\]$/.test(trimmedValue)) {
        const inner = trimmedValue.slice(1, -1);
        return inner
          .split(',')
          .map((item) => item.trim())
          .filter((item) => item.length)
          .map((item) => parseValue(item));
      }
      const quoteMatch = trimmedValue.match(/^(['"])(.*)\1$/);
      if (quoteMatch) {
        return quoteMatch[2];
      }
      return trimmedValue;
    };

    for (const line of lines) {
      if (/^\s*$/.test(line)) {
        continue;
      }
      const arrayItemMatch = line.match(/^\s*-\s+(.*)$/);
      if (arrayItemMatch && currentKey) {
        if (!Array.isArray(metadata[currentKey])) {
          metadata[currentKey] = [] as FrontmatterValue[];
        }
        (metadata[currentKey] as FrontmatterValue[]).push(
          parseValue(arrayItemMatch[1]),
        );
        continue;
      }

      const keyValueMatch = line.match(/^([^:]+):\s*(.*)$/);
      if (keyValueMatch) {
        currentKey = keyValueMatch[1].trim();
        metadata[currentKey] = parseValue(keyValueMatch[2] || '');
      }
    }

    return { metadata, content: markdown.slice(frontmatterMatch[0].length) };
  }
}
