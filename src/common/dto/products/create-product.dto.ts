import { ApiProperty } from '@nestjs/swagger';

export class CreateProduct {
  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  price!: number;
}

export class CreateProductResponse {
  @ApiProperty()
  id!: string;
}
