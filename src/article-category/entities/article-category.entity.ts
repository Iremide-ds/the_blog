import { Article } from 'src/article/entities/article.entity';
import { BaseEntity } from 'src/resources/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class ArticleCategory extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Article)
  @JoinTable()
  articles: Article[];
}
