import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  addProduct(title: string, description: string, price: number) {
    const id = Math.random().toString();
    this.products.push(new Product(id, title, description, price));
    return id ;
  }

  getProducts() {
    return [...this.products];
  }
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return {...product};
    } else {
      throw new NotFoundException('no product with this id');
    }
  }

}
