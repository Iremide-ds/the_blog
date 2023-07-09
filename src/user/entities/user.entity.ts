import { Exclude } from 'class-transformer';
import { ArticleComment } from 'src/article-comment/entities/article-comment.entity';
import { Article } from 'src/article/entities/article.entity';
import { Role } from 'src/enums/roles.enum';
import { BaseEntity } from 'src/resources/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @OneToMany((type) => Article, (article) => article.author, { nullable: true })
  articles: Article[];

  @OneToMany((type) => ArticleComment, (comment) => comment.user, {
    nullable: true,
  })
  comments: ArticleComment[];

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
}
