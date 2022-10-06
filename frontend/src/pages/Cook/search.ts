import { Recipe } from '../../models/Recipe'
import { IProduct } from '../../models/interfaces'

interface IResult {
  matchingRecipes: Recipe[]
  missingIngredientsRecipes: Recipe[]
  missingQuantityRecipes: Recipe[]
}

export function filterRecipes (userProducts: IProduct[], recipes: Recipe[], threshold: number): IResult {
  const userProductsIds = userProducts.map(ingredient => ingredient.id)

  const filteredResult: IResult = {
    matchingRecipes: [],
    missingIngredientsRecipes: [],
    missingQuantityRecipes: []
  }

  recipes.forEach(recipe => {
    // Filter the recipe products which are missing in the user products
    const extraProducts = recipe.products.filter(product => !userProductsIds.includes(product.id))

    // If there is more extra products than ${threshold}, we do not want to suggest this recipe.
    if (extraProducts.length > threshold) return

    const hasExtraProducts = extraProducts.length > 0
    // If there is no more extra products than ${threshold} we want to check if the user has enough quantity of each products for the recipe
    const commonProducts = recipe.products.filter(product => userProductsIds.includes(product.id))
    const commonProductsMatchQuantity = commonProducts.every(recipeProduct => {
      const userProduct = userProducts.find(userProduct => userProduct.id === recipeProduct.id)
      if (userProduct === undefined) return false
      return recipeProduct.quantity <= userProduct.quantity
    })

    if (hasExtraProducts && commonProductsMatchQuantity) filteredResult.missingIngredientsRecipes.push(recipe)
    else if (!hasExtraProducts && commonProductsMatchQuantity) filteredResult.matchingRecipes.push(recipe)
    else if (!hasExtraProducts && !commonProductsMatchQuantity) filteredResult.missingQuantityRecipes.push(recipe)
    // last case that stays uncovered is (hasExtraProducts && !communProductsMatchQuantity)
    // Meaning : there are extra products and user has not enough quantity of matching products to cook the recipe
    // The recipe requirepents is too far from what we want to suggest to the user, so we don't push it.
  })

  return filteredResult
}
