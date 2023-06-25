import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleCategory } from './entities/article-category.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ArticleCategoryService {
  constructor(
    @InjectRepository(ArticleCategory)
    private categoryRepository: Repository<ArticleCategory>,
  ) {}

  async create(
    createArticleCategoryDto: CreateArticleCategoryDto,
  ): Promise<ArticleCategory> {
    try {
      const category = this.categoryRepository.create();
      Object.assign(category, createArticleCategoryDto);
      return await category.save();
    } catch (error) {
      throw new NotImplementedException(error);
    }
  }

  async findAll(): Promise<ArticleCategory[]> {
    return await this.categoryRepository.find();
  }

  async findMany(id: number[]): Promise<ArticleCategory[]> {
    return await this.categoryRepository.find({ where: { id: In(id) } });
  }

  async findOne(id: number): Promise<ArticleCategory> {
    return await this.categoryRepository.findOne({
      where: { id: id },
      loadRelationIds: true,
    });
  }

  async update(
    id: number,
    updateArticleCategoryDto: UpdateArticleCategoryDto,
  ): Promise<ArticleCategory> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: id },
      });
      Object.assign(category, updateArticleCategoryDto);
      return await category.save();
    } catch (error) {
      throw new NotImplementedException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const deleteResult = await this.categoryRepository.softDelete(id);
      return deleteResult.affected > 1;
    } catch (error) {
      throw new NotImplementedException(error);
    }
  }
}
