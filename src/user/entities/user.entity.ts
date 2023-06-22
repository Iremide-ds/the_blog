import { Exclude } from 'class-transformer';
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

  @Exclude()
  @Column()
  password: string;

  @OneToMany((type) => Article, (article) => article.author)
  articles: Article[];

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
}
