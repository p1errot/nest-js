import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    // Use env variables to define the connection
    MongooseModule.forRoot('mongodb://localhost:27017/nest-test-project'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
