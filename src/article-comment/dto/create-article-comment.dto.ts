import { IsNotEmpty } from 'class-validator';

export class CreateArticleCommentDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  articleId: number;
}
