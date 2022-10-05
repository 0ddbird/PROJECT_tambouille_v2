import { Product } from './Product'

export interface IProduct {
  id: number
  quantity: number
}

export interface IProductsObject {
  [index: number]: Product
}
