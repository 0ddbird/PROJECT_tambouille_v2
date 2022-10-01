import * as React from 'react'
import { Recipe } from '../../models/Recipe'
import { IProduct } from '../../models/interfaces'

interface IRecipeProps {
  recipe: Recipe
  userProducts: IProduct[] | undefined
  setUserProducts: React.Dispatch<React.SetStateAction<IProduct[] | undefined>>
}

const RecipeArticle = ({ recipe, setUserProducts }: IRecipeProps): JSX.Element => {
  function handleRecipeClick (e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    const ingredients = recipe.getProducts()
    console.log('recipe ingredients: ', ingredients)
  }

  return (
    <article onClick={(e) => handleRecipeClick(e)}>{recipe.name}</article>
  )
}

export default RecipeArticle
