import { Article } from 'src/article/entities/article.entity';
import { BaseEntity } from 'src/resources/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ArticleComment extends BaseEntity {
  @ManyToOne((type) => User, (user) => user.comments)
  user: User;

  @Column()
  content: string;

  @ManyToOne((type) => Article, (article) => article.comments)
  article: Article;
}
