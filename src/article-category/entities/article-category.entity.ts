import { Article } from 'src/article/entities/article.entity';
import { BaseEntity } from 'src/resources/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class ArticleCategory extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany((type) => Article, (article) => article.categories)
  articles: Article[];
}
