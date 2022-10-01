import { IProduct } from './interfaces'

export class Recipe {
  id: number
  name: string
  products: IProduct[]

  constructor (id: number, name: string, products: IProduct[]) {
    this.id = id
    this.name = name
    this.products = products
  }

  getProducts (): IProduct[] {
    return this.products
  }

  getProductsIds (): number[] {
    const newResult = this.products.map(product => {
      return product.id
    })
    return newResult
  }
}
