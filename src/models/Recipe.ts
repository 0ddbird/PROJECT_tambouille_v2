import { IProduct } from './interfaces'

export class Recipe {
  id: number
  name: string
  products: IProduct[]
  selected: number

  constructor (id: number, name: string, products: IProduct[], selected: number) {
    this.id = id
    this.name = name
    this.products = products
    this.selected = selected
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
