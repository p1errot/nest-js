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
  addProduct(
    @Body() data: { title: string; description: string; price: number },
  ): { id: string } {
    const id = this.productsService.insert(data);

    return { id };
  }

  @Get()
  getAll() {
    return { products: this.productsService.getAll() };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return { product: this.productsService.getOne(id) };
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() product: { title?: string; description?: string; price?: number },
  ) {
    this.productsService.update(id, product);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productsService.deleteProduct(id);
  }
}
