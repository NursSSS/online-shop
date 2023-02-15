import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { AddNews } from './dto/add-news.dto';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { Role } from 'src/user/enum/role-decorator';
import { UserRole } from 'src/user/enum/role.enum';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Get()
  async getNews() {
    return await this.newsService.getNews();
  }

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Post('add')
  async addNews(@Body() newsDto: AddNews) {
    return await this.newsService.addNews(newsDto);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Delete('delete/:id')
  async deleteNews(@Param('id') id: string) {
    return this.newsService.deleteNewsById(id);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Get(':id')
  async getNewsById(@Param('id') id: string) {
    return this.newsService.getNewsById(id);
  }
}
