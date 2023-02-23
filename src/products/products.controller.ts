import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body() data: { title: string; description: string; price: number },
  ) {
    const id = await this.productsService.insertOne(data);

    return { id };
  }

  @Get()
  async getAll() {
    return { products: await this.productsService.getAll() };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return { product: await this.productsService.getOne(id) };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: { title?: string; description?: string; price?: number },
  ) {
    await this.productsService.update(id, product);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);
  }
}
