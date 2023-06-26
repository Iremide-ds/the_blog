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
      port: 3306 || 3306,
      username: '2l8n7ej84bm8lyuq2ddo' || 'tester',
      password: 'pscale_pw_6GigRRRV91AMa9zCBK3fdeOtJ6Cg5eMVtiI3PKOEPTw' || '',
      database: 'the_blog' || 'test',
      synchronize: true,
      dropSchema: false,
      logging: true,
      ssl: {
        mode: 'VERIFY_IDENTITY',
        ca: process.env.SSLCERT,
      },
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      debug: true,
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
