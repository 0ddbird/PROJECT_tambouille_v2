import { Recipe } from '../models/Recipe'

const applePie = new Recipe(0, 'Apple pie', [
  { id: 0, quantity: 200 },
  { id: 1, quantity: 8 },
  { id: 2, quantity: 150 },
  { id: 16, quantity: 2 }
], 0)

const mushroomsPasta = new Recipe(1, 'Pasta with mushrooms', [
  { id: 6, quantity: 150 },
  { id: 7, quantity: 50 },
  { id: 5, quantity: 2000 }
], 0)

const chocolateCake = new Recipe(2, 'Chocolate cake', [
  { id: 2, quantity: 150 },
  { id: 11, quantity: 250 },
  { id: 4, quantity: 300 },
  { id: 10, quantity: 3 },
  { id: 8, quantity: 250 }
], 0)

const appleRecipe = new Recipe(3, 'Apple', [{ id: 1, quantity: 1 }], 0)

const scrambledEgg = new Recipe(4, 'Scrambled egg', [{ id: 10, quantity: 1 }], 0)

const boiledEgg = new Recipe(5, 'Boiled egg', [{ id: 10, quantity: 1 }], 0)

const friedEgg = new Recipe(6, 'Fried egg', [{ id: 10, quantity: 1 }], 0)

const recipes: Recipe[] = [applePie, appleRecipe, mushroomsPasta, chocolateCake, scrambledEgg, boiledEgg, friedEgg]

export { recipes }
