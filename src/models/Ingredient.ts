export class Ingredient {
  id: number
  name: string
  category: number
  unit: string

  constructor (id: number, name: string, category: number, unit: string) {
    this.id = id
    this.name = name
    this.category = category
    this.unit = unit
  }
}
