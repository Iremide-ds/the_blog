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
import { ArticleCategoryService } from './article-category.service';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { Roles } from 'src/decorators/role_guard.decorator';
import { Role } from 'src/enums/roles.enum';
import { FindOneParams } from 'src/resources/findOneParam.dto';

@ApiTags('Article Category')
@Controller('article-category')
export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  @Roles(Role.Admin, Role.Author)
  @Post()
  create(@Body() createArticleCategoryDto: CreateArticleCategoryDto) {
    return this.articleCategoryService.create(createArticleCategoryDto);
  }

  @Get()
  findAll() {
    return this.articleCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: FindOneParams) {
    return this.articleCategoryService.findOne(id.id);
  }

  @Patch(':id')
  update(
    @Param() id: FindOneParams,
    @Body() updateArticleCategoryDto: UpdateArticleCategoryDto,
  ) {
    return this.articleCategoryService.update(id.id, updateArticleCategoryDto);
  }

  @Delete(':id')
  remove(@Param() id: FindOneParams) {
    return this.articleCategoryService.remove(id.id);
  }
}
