import { Recipe } from '../models/Recipe'

const applePie = new Recipe(0, 'Apple pie', [
  { id: 0, quantity: 1 },
  { id: 1, quantity: 8 },
  { id: 4, quantity: 4 }
])

const mushroomsPasta = new Recipe(1, 'Pasta with mushrooms', [
  { id: 6, quantity: 250 },
  { id: 7, quantity: 8 },
  { id: 5, quantity: 50 }
])

const chocolateCake = new Recipe(2, 'Chocolate cake', [
  { id: 2, quantity: 3 },
  { id: 11, quantity: 5 },
  { id: 4, quantity: 1 },
  { id: 10, quantity: 3 }
])

const appleRecipe = new Recipe(3, 'Apple', [{ id: 1, quantity: 1 }])

const recipes: Recipe[] = [applePie, appleRecipe, mushroomsPasta, chocolateCake]

export { recipes }
