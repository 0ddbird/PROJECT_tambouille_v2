import * as React from 'react'
import { Recipe } from '../../models/Recipe'
import { Product } from '../../models/Product'

interface ISuggestedRecipeProps {
  recipe: Recipe
  userProducts: Product[] | []
  shoppingList: Product[] | []
  setShoppingList: (Product: Product[] | []) => void
}

const SuggestedRecipe = ({ recipe, userProducts, shoppingList, setShoppingList }: ISuggestedRecipeProps): JSX.Element => {
  console.log(userProducts, shoppingList, setShoppingList)

  function addToShoppingList (recipe: Recipe): void {
    // Check if there are products matching this recipe products in the shopping list
    // if so, add missing quantity to existing products
    // else add all products in full quantity to
    console.log(recipe)
  }
  return (
    <article>
      <h1>{recipe.name}</h1>
      <h2>Ingredients</h2>
      <ul>
        {
          recipe.products.map(product => {
            return <li key={product.id}>{product.name}, {product.quantity}{product.unit}</li>
          })
        }
      </ul>
      <button type='button' onClick={() => addToShoppingList(recipe)}>Add to shopping list</button>
    </article>
  )
}

export default SuggestedRecipe
