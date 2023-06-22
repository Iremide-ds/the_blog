import { Transform } from 'class-transformer';
import { BaseEntity } from 'src/resources/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Article extends BaseEntity {
  @Transform(({ value }) => {
    return {
      id: value.userId,
      fullName: `${value.lastName}, ${value.firstName}`,
    };
  })
  @ManyToOne((type) => User, (author) => author.articles)
  author: User;
}
