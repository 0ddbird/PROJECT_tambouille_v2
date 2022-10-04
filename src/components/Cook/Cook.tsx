import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import { Recipe } from '../../models/Recipe'
import { filterRecipes } from './filter'
import RecipeCard from '../RecipeCard/RecipeCard'
import './cook.scss'
import SelectedRecipe from '../SelectedRecipe/SelectedRecipe'

interface ICookProps {
  recipes: Recipe[]
}

/*
* This component displays possible recipes based on the user's available ingredients
* When the user selects a recipe and click on the 'cook' button, the ingredients are consumed and removed from the pantry
*/

const Cook = ({ recipes }: ICookProps): JSX.Element => {
  const { userProducts, setUserProducts, selectedRecipes, setSelectedRecipes } = useContext(AppContext)
  const [possibleRecipes, setPossibleRecipes] = useState<Recipe[] | []>([])

  useEffect(() => {
    if (userProducts == null) return
    const matchingRecipes = filterRecipes(userProducts, recipes)
    setPossibleRecipes(matchingRecipes)
  }, [userProducts])

  return (
    <>
    <h1>Cook!</h1>
      <section className='cook'>
        <section className='user-products'>
          <h1>Your products</h1>
          { userProducts.length > 0 &&
            <ul>
              {
                userProducts.map(ingredient => {
                  return <li key={ingredient.id}>{ingredient.name}, {ingredient.quantity}</li>
                })
              }
            </ul>
          }
        </section>
        <section className='possible-recipes-section'>
          <h1>Possible recipes</h1>
          <div className='possible-recipes'>
          { (possibleRecipes.length > 0) &&
            possibleRecipes.map(recipe =>
            <RecipeCard
            key={recipe.id}
            recipe={recipe}
            userProducts={userProducts}
            setUserProducts={setUserProducts}
            selectedRecipes={selectedRecipes}
            setSelectedRecipes={setSelectedRecipes}
            />)
          }
          </div>
        </section>
        <section className='selected-recipes-section'>
          <h1>Recipes in the pot!</h1>
          <div className='selected-recipes'>
          {
            selectedRecipes.length > 0
              ? selectedRecipes.map(recipe => {
                return <SelectedRecipe
                        key={recipe.id}
                        selectedRecipe={recipe}
                        userProducts={userProducts}
                        setUserProducts={setUserProducts}
                        selectedRecipes={selectedRecipes}
                        setSelectedRecipes={setSelectedRecipes}
                        />
              })
              : <div>You haven&apos;t selected any recipe</div>
          }
          </div>
        </section>
      </section>
    </>
  )
}

export default Cook
