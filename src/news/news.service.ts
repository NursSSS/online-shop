import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsEntity } from './entity/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddNews } from './dto/add-news.dto';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsEntity: Repository<NewsEntity>,
  ) {}

  async getNews(): Promise<NewsEntity[]> {
    return await this.newsEntity.find();
  }

  async addNews(newsDto: AddNews): Promise<NewsEntity> {
    return await this.newsEntity.save(newsDto);
  }

  async deleteNewsById(id: string): Promise<any> {
    const news = await this.newsEntity.findOneBy({
      id: +id,
    });

    if (!news) {
      throw new NotFoundException('Unable to delete not existing news');
    }
    await this.newsEntity.remove(news);
    return 'News with a given ID was removed';
  }

  async getNewsById(id: string): Promise<any> {
    const news = await this.newsEntity.findOneBy({
      id: +id,
    });

    if (!news) {
      throw new NotFoundException('Requested news was not found');
    }

    return news;
  }
}
