import * as React from 'react'
import { Recipe } from '../../models/Recipe'
import { Product } from '../../models/Product'
import './recipe-article.scss'
import { ingredients } from '../../mocks/ingredients'
import { NavLink } from 'react-router-dom'

interface IRecipeCardProps {
  recipe: Recipe
  userProducts: Product[] | []
  setUserProducts: (Product: Product[] | []) => void
  selectedRecipes: Recipe[] | []
  setSelectedRecipes: (Recipe: Recipe[] | []) => void
}

const RecipeCard = ({ recipe, userProducts, setUserProducts, selectedRecipes, setSelectedRecipes }: IRecipeCardProps): JSX.Element => {
  function handleAddRecipe (): void {
    const newUserProducts = [...userProducts]
    // Consume user products
    recipe.products.forEach(recipeProduct => {
      const productToUpdateIndex = newUserProducts.findIndex(userProduct => userProduct.id === recipeProduct.id)
      const productToUpdate = newUserProducts[productToUpdateIndex]
      newUserProducts[productToUpdateIndex] = {
        ...productToUpdate,
        quantity: productToUpdate.quantity = productToUpdate.quantity - recipeProduct.quantity
      }
    })
    setUserProducts(newUserProducts)
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
      <article className='recipe'>
        <h1>{recipe.name}</h1>
        <h2>Ingredients</h2>
        <ul>
          {
            recipe.products.map(product => {
              return <li key={product.id}>{ingredients[product.id].name}, {product.quantity} {ingredients[product.id].unit}</li>
            })
          }
        </ul>
        <NavLink to={`/recipes/${recipe.id}`}>Directions</NavLink>
        <button type='button'>Cook!</button>
        <button type='button' onClick={handleAddRecipe}>Throw in the pot!</button>
        </article>
  )
}

export default RecipeCard
