import { Recipe } from '../../models/Recipe'
import { IProduct } from '../../models/interfaces'

interface IResult {
  matchingRecipes: Recipe[]
  missingIngredientsRecipes: Recipe[]
  missingQuantityRecipes: Recipe[]
}

export function filterRecipes (userProducts: IProduct[], recipes: Recipe[], threshold: number): IResult {
  const userProductsIds = userProducts.map(ingredient => { return ingredient.id })

  // Returns an array of recipes which products are in userProducts and match the required quantity for the recipe
  const filteredResult: IResult = {
    matchingRecipes: [],
    missingIngredientsRecipes: [],
    missingQuantityRecipes: []
  }

  recipes.forEach(recipe => {
    // Check that user has almost all required products to cook the recipe, with a tolerance of ${threshold}
    const extraProducts = recipe.getProducts().filter(product => !userProductsIds.includes(product.id))

    // If there is more extra products than ${threshold}, we do not push it to the result
    if (extraProducts.length > threshold) return

    const hasExtraProducts = extraProducts.length > 0
    // If there is no more extra products than ${threshold} we want to check if the user has a greater product quantity than the recipe requires
    const commonProducts = recipe.getProducts().filter(product => userProductsIds.includes(product.id))
    const commonProductsMatchQuantity = commonProducts.every(recipeProduct => {
      const userProduct = userProducts.find(userProduct => userProduct.id === recipeProduct.id)
      if (userProduct === undefined) return false
      return recipeProduct.quantity <= userProduct.quantity
    })

    if (hasExtraProducts && commonProductsMatchQuantity) filteredResult.missingIngredientsRecipes.push(recipe)
    else if (!hasExtraProducts && commonProductsMatchQuantity) filteredResult.matchingRecipes.push(recipe)
    else if (!hasExtraProducts && !commonProductsMatchQuantity) filteredResult.missingQuantityRecipes.push(recipe)
  })

  return filteredResult
}
