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
import { ArticleCommentService } from './article-comment.service';
import { CreateArticleCommentDto } from './dto/create-article-comment.dto';
import { UpdateArticleCommentDto } from './dto/update-article-comment.dto';
import { FindOneParams } from 'src/resources/findOneParam.dto';

@ApiTags('Article Comment')
@Controller('article-comment')
export class ArticleCommentController {
  constructor(private readonly articleCommentService: ArticleCommentService) {}

  @Post()
  create(@Body() createArticleCommentDto: CreateArticleCommentDto) {
    return this.articleCommentService.create(createArticleCommentDto);
  }

  @Get()
  findAll() {
    return this.articleCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: FindOneParams) {
    return this.articleCommentService.findOne(id.id);
  }

  @Patch(':id')
  update(
    @Param() id: FindOneParams,
    @Body() updateArticleCommentDto: UpdateArticleCommentDto,
  ) {
    return this.articleCommentService.update(id.id, updateArticleCommentDto);
  }

  @Delete(':id')
  remove(@Param() id: FindOneParams) {
    return this.articleCommentService.remove(id.id);
  }
}
