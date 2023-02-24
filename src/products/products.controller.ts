import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateProduct } from './../common/dto/products/create-product.dto';
import { ProductsService } from './products.service';
import { CreateProductResponse } from '../common/dto/products/create-product.dto';
import { UpdateProduct } from '../common/dto/products/update-product.dto';
import {
  GetProductResponse,
  GetProductsResponse,
} from '../common/dto/products/get-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOkResponse({ type: CreateProductResponse })
  async addProduct(
    @Body() data: CreateProduct,
  ): Promise<CreateProductResponse> {
    const id = await this.productsService.insertOne(data);

    return { id };
  }

  @Get()
  @ApiOkResponse({ type: GetProductsResponse })
  async getAll() {
    return { products: await this.productsService.getAll() };
  }

  @Get(':id')
  @ApiOkResponse({ type: GetProductResponse })
  async getOne(@Param('id') id: string) {
    return { product: await this.productsService.getOne(id) };
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() product: UpdateProduct) {
    await this.productsService.update(id, product);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);
  }
}
