import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateArticleCommentDto } from './dto/create-article-comment.dto';
import { UpdateArticleCommentDto } from './dto/update-article-comment.dto';
import { ArticleComment } from './entities/article-comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleService } from 'src/article/article.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ArticleCommentService {
  constructor(
    @InjectRepository(ArticleComment)
    private commentRepository: Repository<ArticleComment>,
    private articleService: ArticleService,
    private userService: UserService,
  ) {}

  async create(
    createArticleCommentDto: CreateArticleCommentDto,
  ): Promise<ArticleComment> {
    try {
      const user = await this.userService.findOne(
        createArticleCommentDto.userId,
      );
      const article = await this.articleService.findOne(
        createArticleCommentDto.articleId,
      );

      const comment = this.commentRepository.create();
      Object.assign(comment, {
        ...createArticleCommentDto,
        user: user,
        article: article,
      });
      return await comment.save();
    } catch (error) {
      throw new NotImplementedException(error);
    }
  }

  async findAll(): Promise<ArticleComment[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: number): Promise<ArticleComment> {
    return await this.commentRepository.findOne({
      where: { id: id },
      loadRelationIds: true,
    });
  }

  async update(
    id: number,
    updateArticleCommentDto: UpdateArticleCommentDto,
  ): Promise<ArticleComment> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: id },
      });
      Object.assign(comment, updateArticleCommentDto);
      return await comment.save();
    } catch (error) {
      throw new NotImplementedException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const deleteResult = await this.commentRepository.softDelete(id);
      return deleteResult.affected > 1;
    } catch (error) {
      throw new NotImplementedException(error);
    }
  }
}
