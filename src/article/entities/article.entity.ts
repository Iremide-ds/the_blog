import { Transform } from 'class-transformer';
import { ArticleComment } from 'src/article-comment/entities/article-comment.entity';
import { BaseEntity } from 'src/resources/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Article extends BaseEntity {
  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column({ nullable: true })
  content?: string;

  @Column({ nullable: true })
  htmlContent?: string;

  @Column({ default: 0 })
  likes: number;

  @Transform(({ value }) => {
    return {
      id: value.id,
      fullName: `${value.lastName}, ${value.firstName}`,
    };
  })
  @ManyToOne((type) => User, (author) => author.articles)
  author: User;

  @Transform(({ value }) => {
    return {
      id: value.id,
      name: value.name,
    };
  })
  @OneToMany((type) => ArticleComment, (comment) => comment.article)
  comments: ArticleComment[];
}
