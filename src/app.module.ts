import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleCategoryModule } from './article-category/article-category.module';
import { ArticleCommentModule } from './article-comment/article-comment.module';
import { ArticleModule } from './article/article.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DBHOST || 'localhost',
      // port: +process.env.DBPORT || 3306,
      username: process.env.DBUSER || 'tester',
      password: process.env.FBPASSWORD || '',
      database: process.env.DBNAME || 'test',
      // ssl: { rejectUnauthorized: true },
      synchronize: true,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UserModule,
    AuthenticationModule,
    ArticleModule,
    ArticleCommentModule,
    ArticleCategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
