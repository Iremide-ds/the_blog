import { PickType } from '@nestjs/swagger';
import { CreateArticleCommentDto } from './create-article-comment.dto';

export class UpdateArticleCommentDto extends PickType(CreateArticleCommentDto, [
  'content',
] as const) {}
