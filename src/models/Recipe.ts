import { Product } from './Product'

export class Recipe {
  id: number
  name: string
  products: Product[]
  selected: number

  constructor (id: number, name: string, products: Product[], selected: number) {
    this.id = id
    this.name = name
    this.products = products
    this.selected = selected
  }

  getProducts (): Product[] {
    return this.products
  }

  getProductsIds (): number[] {
    const newResult = this.products.map(product => {
      return product.id
    })
    return newResult
  }
}
