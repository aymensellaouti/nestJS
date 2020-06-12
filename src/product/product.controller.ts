import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {
  }
  @Post()
  addProduct(
    @Body() product,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const id = this.productService.addProduct(title, description, price);
    return {id} ;
  }
  @Get()
  getProducts() {
    return this.productService.getProducts();
  }
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
}
