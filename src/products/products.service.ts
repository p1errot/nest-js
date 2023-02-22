import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private findProduct(id: string): [Product, number] {
    const index = this.products.findIndex((product) => product.id == id);
    const product = this.products[index];

    if (!product) {
      throw new NotFoundException();
    }

    return [product, index];
  }

  insert({
    title,
    description,
    price,
  }: {
    title: string;
    description: string;
    price: number;
  }) {
    const id = new Date().getTime().toString();
    const newProduct = new Product(id, title, description, price);

    this.products.push(newProduct);

    return id;
  }

  getAll() {
    return [...this.products];
  }

  getOne(id: string) {
    return this.findProduct(id)[0];
  }

  update(
    id: string,
    product: { title?: string; description?: string; price?: number },
  ) {
    const [productStored, index] = this.findProduct(id);
    this.products[index] = {
      ...productStored,
      title: product.title || productStored.title,
      description: product.description || productStored.description,
      price: product.price || productStored.price,
    };

    return null;
  }

  deleteProduct(id: string) {
    const index = this.findProduct(id)[1];
    const newProductsList = [...this.products];

    newProductsList.splice(index, 1);
    this.products = newProductsList;
  }
}
