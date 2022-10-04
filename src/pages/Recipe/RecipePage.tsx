import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Recipe } from '../../models/Recipe'

interface IRecipePageProps {
  recipes: Recipe[]
}

const RecipePage = ({ recipes }: IRecipePageProps): JSX.Element => {
  const { id } = useParams()
  if (id === undefined) return <div>No result</div>
  const recipeId = parseInt(id)
  const currentRecipe = recipes.find(recipe => recipe.id === recipeId)
  if (currentRecipe == null) return <div>No Recipe found</div>
  return (
  <section>
    <h1>{currentRecipe.name}</h1>
    <h2>Ingredients</h2>
    <ul>
      {
        currentRecipe.products.map(product => {
          return <li key={product.id}>{product.name}</li>
        })
      }
    </ul>
  </section>
  )
}

export default RecipePage
