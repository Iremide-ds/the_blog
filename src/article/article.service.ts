import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { UserService } from 'src/user/user.service';
import { ArticleCategoryService } from 'src/article-category/article-category.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private userService: UserService,
    private categoryService: ArticleCategoryService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const user = await this.userService.findOne(createArticleDto.author);
    const categories = await this.categoryService.findMany(
      createArticleDto.categoryIds,
    );
    const article = this.articleRepository.create({
      ...createArticleDto,
      author: user,
    });

    const savedArticle = await article.save();

    for (let i = 0; i < categories.length; i++) {
      categories[i].articles.push(savedArticle);
    }
    return savedArticle;
  }

  async findAll() {
    return await this.articleRepository.find({ loadRelationIds: true });
  }

  async findOne(id: number) {
    return await this.articleRepository.findOne({
      where: { id: id },
      loadRelationIds: true,
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      const article = await this.articleRepository.findOne({
        where: { id: id },
      });
      Object.assign(article, updateArticleDto);
      return await article.save();
    } catch (error) {
      console.error(error);
      throw new NotImplementedException();
    }
  }

  async remove(id: number) {
    return await this.articleRepository.softDelete(id);
  }
}
