import { Product } from './Product'

export class Recipe {
  constructor (
    public id: number,
    public name: string,
    public products: Product[],
    public selected: number
  ) {}

  getProductsIds (): number[] {
    return this.products.map(product => product.id)
  }
}
