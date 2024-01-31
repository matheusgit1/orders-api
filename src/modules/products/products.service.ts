import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create({ ...createProductDto });
    return await this.productRepo.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepo.find();
  }

  async findOne(id: string) {
    return await this.productRepo.findOne({ where: { id: id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productupdate = await this.productRepo.update(
      { id },
      {
        ...updateProductDto,
      },
    );
    return productupdate;
  }

  async remove(id: string) {
    await this.productRepo.delete(id);
  }
}
