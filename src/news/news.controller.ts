import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { NewsEntity } from './entity/news.entity';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @ApiOkResponse({ type: NewsEntity })
  @Get()
  async getNews() {
    return await this.newsService.getNews();
  }

  @ApiOkResponse({ type: NewsEntity })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiBadRequestResponse({ description: 'Validation error || News with this title already exists' })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Post('add')
  async addNews(@Body() newsDto: AddNews) {
    return await this.newsService.addNews(newsDto);
  }

  @ApiOkResponse({ type: NewsEntity })
  @ApiNotFoundResponse({ description: 'Product is not found' })
  @ApiForbiddenResponse({ description: 'No access' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Acess denied' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
      schema: {
          type: 'object',
          properties: {
              files: {
                  type: 'array',
                  items: {
                    type: 'string',
                    format: 'binary',
                  }
              }
          }
      }
  })
  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @Put('/image/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(@Param('id') id: number, @UploadedFiles() files: Array<Express.Multer.File>){
      return await this.newsService.updateImages(id, files)
  }

  @ApiOkResponse({ description: 'News with a given ID was removed' })
  @ApiNotFoundResponse({ description: 'Unable to delete not existing news' })
  @ApiUnauthorizedResponse({ description: 'User is not registered' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @Delete('delete/:id')
  async deleteNews(@Param('id') id: number) {
    return this.newsService.deleteNewsById(id);
  }

  @ApiOkResponse({ type: NewsEntity })
  @ApiNotFoundResponse({ description: 'News is not found' })
  @Get(':id')
  async getNewsById(@Param('id') id: number) {
    return this.newsService.getNewsById(id);
  }
}
