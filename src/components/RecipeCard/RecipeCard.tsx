import * as React from 'react'
import { Recipe } from '../../models/Recipe'
import { Product } from '../../models/Product'
import './recipe-article.scss'
import { NavLink } from 'react-router-dom'
import Ustensils from '../../assets/utensils-solid.svg'

interface IRecipeCardProps {
  recipe: Recipe
  localUserProducts: Product[] | []
  setLocalUserProducts: (Product: Product[]) => void
  selectedRecipes: Recipe[] | []
  setSelectedRecipes: (Recipe: Recipe[]) => void
}

const RecipeCard = ({ recipe, localUserProducts, setLocalUserProducts, selectedRecipes, setSelectedRecipes }: IRecipeCardProps): JSX.Element => {
  function handleAddRecipe (): void {
    const newUserProducts = [...localUserProducts]
    // Consume local user products
    recipe.products.forEach(recipeProduct => {
      const productToUpdateIndex = newUserProducts.findIndex(userProduct => userProduct.id === recipeProduct.id)
      const productToUpdate = newUserProducts[productToUpdateIndex]
      newUserProducts[productToUpdateIndex] = {
        ...productToUpdate,
        quantity: productToUpdate.quantity = productToUpdate.quantity - recipeProduct.quantity
      }
    })
    setLocalUserProducts(newUserProducts)
    // Add recipe to selected
    const existingRecipeIndex = selectedRecipes.findIndex(selectedRecipe => selectedRecipe.id === recipe.id)
    let newSelectedRecipes = [...selectedRecipes]
    if (existingRecipeIndex === -1) {
      const { selected } = recipe
      const updatedRecipe = new Recipe(recipe.id, recipe.name, recipe.products, selected + 1)
      newSelectedRecipes = [...selectedRecipes, updatedRecipe]
    } else newSelectedRecipes[existingRecipeIndex].selected += 1
    setSelectedRecipes(newSelectedRecipes)
  }

  return (
  <article className='possible-recipe'>
    <h1 className='possible-recipe-name'>{recipe.name}</h1>
    <NavLink className='possible-recipe-link' to={`/recipes/${recipe.id}`}>Details</NavLink>
    <button className='possible-recipe-menu-button'type='button' onClick={handleAddRecipe}>
      <img className='add-to-menu-icon' src={Ustensils} alt='add-to-menu'/>
      </button>
  </article>
  )
}

export default RecipeCard
