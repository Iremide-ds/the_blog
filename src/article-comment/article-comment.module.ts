import { Module } from '@nestjs/common';
import { ArticleCommentService } from './article-comment.service';
import { ArticleCommentController } from './article-comment.controller';
import { ArticleComment } from './entities/article-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/authentication.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleComment])],
  controllers: [ArticleCommentController],
  providers: [
    ArticleCommentService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ArticleCommentModule {}
