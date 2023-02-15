import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { NewsService } from './news.service';
import { AddNews } from './dto/add-news.dto';
import { DeleteNews } from './dto/delete-news.dto';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  async getNews() {
    return await this.newsService.getNews();
  }

  @Post('add')
  async addNews(@Body() newsDto: AddNews) {
    return await this.newsService.addNews(newsDto);
  }

  @Delete('delete')
  async deleteNews(@Body() delNewsDto: DeleteNews) {
    return this.newsService.deleteNewByID(delNewsDto);
  }
}
