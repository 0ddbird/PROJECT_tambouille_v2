import * as React from 'react'
import { Recipe } from '../../models/Recipe'
import { Product } from '../../models/Product'
import { IProductsObject } from '../../models/interfaces'
import rfdc from 'rfdc'

interface IRecipeExtraQuantityProps {
  recipe: Recipe
  userProducts: Product[]
  shoppingList: IProductsObject
  setShoppingList: React.Dispatch<React.SetStateAction<IProductsObject>>
  category: string
}

const RecipeExtraQuantity = ({ recipe, userProducts, shoppingList, setShoppingList, category }: IRecipeExtraQuantityProps): JSX.Element => {
  function addQuantityToShoppingList (recipe: Recipe): void {
    const updatedShoppingList = rfdc()(shoppingList)
    // compute how much quantity of each product is missing
    // add new products to the shopping list if it doesn't exist, or update the quantity of an existing product

    const recipeProductsIds = recipe.getProductsIds()
    const matchingUserProducts = userProducts.filter(product => recipeProductsIds.includes(product.id))

    const productWithNewQuantity = matchingUserProducts.map(matchingProduct => {
      const indexOfMatchingProduct = matchingUserProducts.findIndex(product => product.id === matchingProduct.id)
      return {
        ...matchingProduct,
        quantity: recipe.products[indexOfMatchingProduct].quantity - matchingProduct.quantity
      }
    })

    productWithNewQuantity.forEach(product => {
      if ((product.id in updatedShoppingList)) updatedShoppingList[product.id].quantity += product.quantity
      else if (!(product.id in updatedShoppingList)) updatedShoppingList[product.id] = { ...product }
    })

    setShoppingList(updatedShoppingList)
  }
  return (
    <article>
      <h1>{recipe.name}</h1>
      <h2>Ingredients</h2>
      <ul>
        {
          recipe.products.map(product => {
            return <li key={`${category} ${product.id}`}>{`${product.name} x${product.quantity}${product.unit}`}</li>
          })
        }
      </ul>
      <button type='button' onClick={() => addQuantityToShoppingList(recipe)}>Add missing quantity to shopping list</button>
    </article>
  )
}

export default RecipeExtraQuantity
