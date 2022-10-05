import { Ingredient } from './Ingredient'

export class Product extends Ingredient {
  constructor (
    id: number,
    name: string,
    category: number,
    unit: string,
    public quantity: number
  ) { super(id, name, category, unit) }
}
