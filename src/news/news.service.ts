import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NewsEntity } from './entity/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddNews } from './dto/add-news.dto';
import { Repository } from 'typeorm';
import { S3_CONFIG } from 'src/utils/s3.config';
let EasyYandexS3 = require('easy-yandex-s3').default;
const s3 = new EasyYandexS3(S3_CONFIG);

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsEntity: Repository<NewsEntity>,
  ) {}

  async getNews(): Promise<NewsEntity[]> {
    return await this.newsEntity.find();
  }

  async addNews(dto: AddNews) {
    const news = await this.newsEntity.findOneBy({ title: dto.title });

    if (news) {
      throw new BadRequestException('News with this title already exists');
    }

    return await this.newsEntity.save(dto);
  }

  async updateImages(id: number, files: Array<Express.Multer.File>){
    const news = await this.getNewsById(id)
    const arr = []
    const arrLink = []

    for(let i = 0; i < files.length; i++){
        arr.push({
            buffer: files[i].buffer
        })
    }

    const upload = await s3.Upload(arr , '/missdress')

    for(let i = 0; i < upload.length; i++){
        arrLink.push(upload[i].Location)
    }

    news.image = arrLink

    await this.newsEntity.save(news)
    return news
}

  async deleteNewsById(id: number): Promise<any> {
    const news = await this.newsEntity.findOneBy({
      id: +id,
    });

    if (!news) {
      throw new NotFoundException('Unable to delete not existing news');
    }
    await this.newsEntity.remove(news);
    return {message: 'News with a given ID was removed'};
  }

  async getNewsById(id: number): Promise<any> {
    const news = await this.newsEntity.findOneBy({
      id: +id,
    });

    if (!news) {
      throw new NotFoundException('Requested news was not found');
    }
    return news;
  }
}
