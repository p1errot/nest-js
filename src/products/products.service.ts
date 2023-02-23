import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private async findProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async insertOne({
    title,
    description,
    price,
  }: {
    title: string;
    description: string;
    price: number;
  }) {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();

    return result._id;
  }

  async getAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async getOne(id: string) {
    return await this.findProduct(id);
  }

  async update(
    id: string,
    product: { title?: string; description?: string; price?: number },
  ) {
    const { title, description, price } = product;
    const productStored = await this.findProduct(id);

    productStored.title = title || productStored.title;
    productStored.description = description || productStored.description;
    productStored.price = price || productStored.price;
    productStored.save();

    return null;
  }

  async deleteProduct(id: string) {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
