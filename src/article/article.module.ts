import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategoryModule } from 'src/article-category/article-category.module';
import { AuthGuard } from 'src/guards/authentication.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { UserModule } from 'src/user/user.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    UserModule,
    ArticleCategoryModule,
  ],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
