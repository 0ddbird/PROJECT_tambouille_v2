import { Ingredient } from './Ingredient'

export class Product extends Ingredient {
  id: number
  name: string
  category: number
  unit: string
  quantity: number

  constructor (id: number, name: string, category: number, unit: string, quantity: number) {
    super(id, name, category, unit)
    this.id = id
    this.name = name
    this.category = category
    this.unit = unit
    this.quantity = quantity
  }
}
