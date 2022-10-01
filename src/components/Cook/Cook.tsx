import React, { useEffect, useState } from 'react'
import { Ingredient } from '../../models/Ingredient'
import { Recipe } from '../../models/Recipe'
import { IProduct } from '../../models/interfaces'
import { filterRecipes } from './filter'
import RecipeArticle from '../RecipeArticle/RecipeArticle'
interface ICookProps {
  recipes: Recipe[]
  ingredientsTable: Ingredient[]
  userProducts: IProduct[] | undefined
  setUserProducts: React.Dispatch<React.SetStateAction<IProduct[] | undefined>>

}

/*
* This component displays possible recipes based on the user's available ingredients
* When the user selects a recipe and click on the 'cook' button, the ingredients are consumed and removed from the pantry
*/

const Cook = ({ recipes, ingredientsTable, userProducts, setUserProducts }: ICookProps): JSX.Element => {
  const [possibleRecipes, setPossibleRecipes] = useState<Recipe[] | []>([])

  useEffect(() => {
    if (userProducts == null) return
    const matchingRecipes = filterRecipes(userProducts, recipes)
    setPossibleRecipes(matchingRecipes)
  }, [userProducts])

  return (
    <div>
      <h1>Cook!</h1>
      <h2>Your products</h2>
      { (userProducts != null && userProducts.length > 0) &&
        <ul>
          {
            userProducts.map(ingredient => {
              return <li key={ingredient.id}>{ingredientsTable[ingredient.id].name}, {ingredient.quantity}</li>
            })
          }
        </ul>
      }
      <h2>Possible recipes</h2>
      <section>
        { (possibleRecipes.length > 0) &&
          possibleRecipes.map(recipe => <RecipeArticle key={recipe.id} recipe={recipe} userProducts={userProducts} setUserProducts={setUserProducts} />)
        }
      </section>
    </div>
  )
}

export default Cook
