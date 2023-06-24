import { Module } from '@nestjs/common';
import { ArticleCategoryService } from './article-category.service';
import { ArticleCategoryController } from './article-category.controller';
import { ArticleCategory } from './entities/article-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/authentication.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategory])],
  controllers: [ArticleCategoryController],
  providers: [
    ArticleCategoryService,
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
export class ArticleCategoryModule {}
