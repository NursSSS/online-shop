import { Injectable } from '@nestjs/common';
import { NewsEntity } from './entity/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddNews } from './dto/add-news.dto';
import { Repository } from 'typeorm';
import { DeleteNews } from './dto/delete-news.dto';

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

  async deleteNewByID(delNewsDto: DeleteNews): Promise<void> {
    const news = await this.newsEntity.findOneBy({
      id: delNewsDto.id,
    });
    await this.newsEntity.remove(news);
  }
}
