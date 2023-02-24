import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { CreateProduct } from './create-product.dto';

export class Product extends CreateProduct {
  @ApiProperty()
  _id: string;
}

export class GetProductsResponse {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(Product),
    },
  })
  products: Product[];
}

export class GetProductResponse {
  @ApiProperty({
    items: {
      $ref: getSchemaPath(Product),
    },
  })
  product: Product;
}
