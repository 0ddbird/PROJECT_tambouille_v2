import * as React from 'react'
import { Recipe } from '../../models/Recipe'
import { Product } from '../../models/Product'
import { IProductsObject } from '../../models/interfaces'
import rfdc from 'rfdc'

interface ISuggestedRecipeProps {
  recipe: Recipe
  userProducts: Product[]
  shoppingList: IProductsObject
  setShoppingList: React.Dispatch<React.SetStateAction<IProductsObject>>
  category: string
}

const SuggestedRecipe = ({ recipe, userProducts, shoppingList, setShoppingList, category }: ISuggestedRecipeProps): JSX.Element => {
  function addToShoppingList (recipe: Recipe): void {
    const currentShoppingList = rfdc()(shoppingList)
    const userProductsIds = userProducts.map(product => product.id)
    const extraProducts = recipe.products.filter(product => !userProductsIds.includes(product.id))
    const extraProductsIds = extraProducts.map(product => product.id)
    recipe.products.forEach(product => {
      if ((product.id in currentShoppingList) && extraProductsIds.includes(product.id)) currentShoppingList[product.id].quantity += product.quantity
      else if (!(product.id in currentShoppingList) && extraProductsIds.includes(product.id)) currentShoppingList[product.id] = { ...product }
    })
    setShoppingList(currentShoppingList)
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
      <button type='button' onClick={() => addToShoppingList(recipe)}>Add missing ingredients to shopping list</button>
    </article>
  )
}

export default SuggestedRecipe
