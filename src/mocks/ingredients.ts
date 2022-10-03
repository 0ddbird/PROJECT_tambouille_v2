import { Ingredient } from '../models/Ingredient'

const categories = [
  {
    id: 0,
    name: 'fruit'
  },
  {
    id: 1,
    name: 'vegetable'
  },
  {
    id: 2,
    name: 'meat'
  },
  {
    id: 3,
    name: 'fish'
  },
  {
    id: 4,
    name: 'dry food'
  },
  {
    id: 5,
    name: 'dairy products'
  },
  {
    id: 6,
    name: 'liquids'
  }
]

// Cat 0 : FRUITS
const pastry = new Ingredient(0, 'pastry', 4, 'g')
const apple = new Ingredient(1, 'apple', 0, 'unit')
const sugar = new Ingredient(2, 'sugar', 4, 'g')
const salt = new Ingredient(3, 'salt', 4, 'g')
const flour = new Ingredient(4, 'flour', 4, 'g')
const water = new Ingredient(5, 'water', 6, 'mL')
const pasta = new Ingredient(6, 'pasta', 4, 'g')
const mushroom = new Ingredient(7, 'mushroom', 1, 'g')
const butter = new Ingredient(8, 'butter', 5, 'g')
const pineapple = new Ingredient(9, 'pineapple', 0, 'unit')
const egg = new Ingredient(10, 'egg', 5, 'unit')
const chocolate = new Ingredient(11, 'chocolate', 4, 'unit')
const chicken = new Ingredient(12, 'chicken', 2, 'g')
const tuna = new Ingredient(13, 'tuna', 3, 'g')
const rice = new Ingredient(14, 'rice', 4, 'g')
const bakeapple = new Ingredient(15, 'crabapple', 0, 'unit')

const ingredientsTable: Ingredient[] = [pastry, apple, sugar, salt, flour, water, pasta, mushroom, butter, pineapple, egg, chocolate, chicken, tuna, rice, bakeapple]

export { ingredientsTable, categories }
