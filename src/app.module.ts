import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { ArticleCommentModule } from './article-comment/article-comment.module';
import { ArticleCategoryModule } from './article-category/article-category.module';
import { ConnectionStringParser } from 'connection-string-parser';

const connectionStringParser = new ConnectionStringParser({
  scheme: 'mysql',
  hosts: [],
});
const connectionObject = connectionStringParser.parse(process.env.DATABASE_URL);

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: connectionObject.hosts[0].host,
      port: connectionObject.hosts[0].port,
      username: connectionObject.username,
      password: connectionObject.password,
      database: connectionObject.scheme,
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
