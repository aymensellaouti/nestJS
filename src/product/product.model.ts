export class Product {
  constructor(id: string, title: string, description: string, price: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }
  id: string;
  title: string;
  description: string;
  price: number;
}
