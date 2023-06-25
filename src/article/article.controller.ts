import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Roles } from 'src/decorators/role_guard.decorator';
import { Role } from 'src/enums/roles.enum';
import { FindOneParams } from 'src/resources/findOneParam.dto';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Roles(Role.Author, Role.User)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: FindOneParams) {
    return this.articleService.findOne(id.id);
  }

  @Roles(Role.Author)
  @Patch(':id')
  update(
    @Param() id: FindOneParams,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id.id, updateArticleDto);
  }

  @Roles(Role.Author, Role.Admin)
  @Delete(':id')
  remove(@Param() id: FindOneParams) {
    return this.articleService.remove(id.id);
  }
}
