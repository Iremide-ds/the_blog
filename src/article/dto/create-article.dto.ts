import { Optional } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  subtitle: string;

  @Optional()
  content?: string;

  @Optional()
  htmlContent?: string;

  @IsNotEmpty()
  author: number;

  @IsNotEmpty()
  categoryIds: number[];
}
