import * as React from 'react'
import { Recipe } from '../../models/Recipe'
import { IProduct } from '../../models/interfaces'
import './recipe-article.scss'
import { ingredientsTable } from '../../mocks/ingredients'

interface IRecipeProps {
  recipe: Recipe
  userProducts: IProduct[] | []
  setUserProducts: React.Dispatch<React.SetStateAction<IProduct[] | []>>
}

const RecipeArticle = ({ recipe, setUserProducts }: IRecipeProps): JSX.Element => {
  function handleRecipeClick (e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    const ingredients = recipe.getProducts()
    console.log('recipe ingredients: ', ingredients)
  }

  return (
    <article className='recipe' onClick={(e) => handleRecipeClick(e)}>
      <h1>{recipe.name}</h1>
      <h2>Ingredients</h2>
      <ul>
        {
          recipe.products.map(product => {
            return <li key={product.id}>{ingredientsTable[product.id].name}, {product.quantity} {ingredientsTable[product.id].unit}</li>
          })
        }
      </ul>
      </article>
  )
}

export default RecipeArticle
