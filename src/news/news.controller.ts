import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { AddNews } from './dto/add-news.dto';
import { RoleGuard } from 'src/auth/guard/role-guard';
import { Role } from 'src/user/enum/role-decorator';
import { UserRole } from 'src/user/enum/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

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
  @UseGuards(RoleGuard, JwtAuthGuard)
  @Post('add')
  @UseInterceptors(FilesInterceptor('files'))
  async addNews(
    @Body('dto') newsDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    newsDto = JSON.parse(newsDto);
    return await this.newsService.addNews(newsDto, files);
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
