import * as React from 'react'
import { Product } from '../../models/Product'
import { Recipe } from '../../models/Recipe'

interface ISelectedRecipeProps {
  selectedRecipe: Recipe
  userProducts: Product[]
  setUserProducts: (Product: Product[] | []) => void
  selectedRecipes: Recipe[]
  setSelectedRecipes: (Recipe: Recipe[] | []) => void
}

const SelectedRecipe = ({ selectedRecipe, userProducts, setUserProducts, selectedRecipes, setSelectedRecipes }: ISelectedRecipeProps): JSX.Element => {
  function handleDeleteSelectedRecipe (recipe: Recipe): void {
    const newUserProducts = [...userProducts]
    recipe.products.forEach(recipeProduct => {
      const productToUpdateIndex = newUserProducts.findIndex(userProduct => userProduct.id === recipeProduct.id)
      const productToUpdate = newUserProducts[productToUpdateIndex]
      newUserProducts[productToUpdateIndex] = {
        ...productToUpdate,
        quantity: productToUpdate.quantity += recipeProduct.quantity
      }
    })
    setUserProducts(newUserProducts)
    const newSelectedRecipes = [...selectedRecipes]
    const recipeToRemoveIndex = newSelectedRecipes.findIndex(selectedRecipe => selectedRecipe.id === recipe.id)
    const recipeToRemove = newSelectedRecipes[recipeToRemoveIndex]
    if (recipeToRemove.selected > 0) {
      recipeToRemove.selected -= 1
      if (recipeToRemove.selected === 0) newSelectedRecipes.splice(recipeToRemoveIndex, 1)
    } else newSelectedRecipes.splice(recipeToRemoveIndex, 1)
    setSelectedRecipes(newSelectedRecipes)
  }
  return (
     <>
        <article key={selectedRecipe.id} className='selected-recipe'>
          <h1>{selectedRecipe.name}</h1>
          <span>x{selectedRecipe.selected}</span>
          <button type='button' onClick={() => handleDeleteSelectedRecipe(selectedRecipe)}>-</button>
        </article>
      </>

  )
}

export default SelectedRecipe
