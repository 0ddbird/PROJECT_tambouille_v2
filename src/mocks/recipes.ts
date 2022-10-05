import { Recipe } from '../models/Recipe'
import { apple, butter, chocolate, cinnamon, egg, flour, mushroom, pasta, pastry, sugar, water, mayonnaise } from './ingredients'

const applePie = new Recipe(0, 'Apple pie', [
  { ...pastry, quantity: 200 },
  { ...apple, quantity: 8 },
  { ...sugar, quantity: 150 },
  { ...cinnamon, quantity: 2 }
], 0)

const mushroomsPasta = new Recipe(1, 'Pasta with mushrooms', [
  { ...pasta, quantity: 150 },
  { ...mushroom, quantity: 50 },
  { ...water, quantity: 2 }
], 0)

const chocolateCake = new Recipe(2, 'Chocolate cake', [
  { ...sugar, quantity: 150 },
  { ...chocolate, quantity: 250 },
  { ...flour, quantity: 300 },
  { ...egg, quantity: 3 },
  { ...butter, quantity: 250 }
], 0)
const appleRecipe = new Recipe(3, 'Apple', [{ ...apple, quantity: 1 }], 0)
const scrambledEgg = new Recipe(4, 'Scrambled egg', [{ ...egg, quantity: 1 }], 0)
const boiledEgg = new Recipe(5, 'Boiled egg', [{ ...egg, quantity: 1 }], 0)
const friedEgg = new Recipe(6, 'Fried egg', [{ ...egg, quantity: 1 }], 0)
const eggMayonnaise = new Recipe(7, 'Egg mayonnaise', [{ ...egg, quantity: 1 }, { ...mayonnaise, quantity: 20 }], 0)

const recipes: Recipe[] = [applePie, appleRecipe, mushroomsPasta, chocolateCake, scrambledEgg, boiledEgg, friedEgg, eggMayonnaise]

export { recipes }
