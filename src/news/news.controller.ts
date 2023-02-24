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
import { Roles } from 'src/user/enum/role-decorator';
import { UserRole } from 'src/user/enum/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { NewsEntity } from './entity/news.entity';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @ApiOkResponse({ type: NewsEntity })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @UseGuards(RoleGuard)
  @Get()
  async getNews() {
    return await this.newsService.getNews();
  }

  @ApiOkResponse({ type: NewsEntity })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiBadRequestResponse({ description: 'Validation error || News with this title already exists' })
  @Roles(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Post('add')
  @UseInterceptors(FilesInterceptor('files'))
  async addNews(
    @Body() newsDto: AddNews,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // newsDto = JSON.parse(newsDto);
    return await this.newsService.addNews(newsDto, files);
  }

  @ApiOkResponse({ description: 'News with a given ID was removed' })
  @ApiNotFoundResponse({ description: 'Unable to delete not existing news' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @UseGuards(RoleGuard)
  @Delete('delete/:id')
  async deleteNews(@Param('id') id: string) {
    return this.newsService.deleteNewsById(id);
  }

  @ApiOkResponse({ type: NewsEntity })
  @ApiNotFoundResponse({ description: 'Unable to delete not existing news' })
  @Get(':id')
  async getNewsById(@Param('id') id: string) {
    return this.newsService.getNewsById(id);
  }
}
