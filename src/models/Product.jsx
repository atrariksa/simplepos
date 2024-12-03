export class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  static fromJSON(data) {
    const price = (Math.round(data.price * 100) / 100).toFixed(2)
    return new Product(data.id, data.name, price, data.stock);
  }
}