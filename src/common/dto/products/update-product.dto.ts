import { ApiProperty } from '@nestjs/swagger';

export class UpdateProduct {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  price?: number;
}
