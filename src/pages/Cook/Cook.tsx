import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../components/ContextProvider/ContextProvider'
import { Recipe } from '../../models/Recipe'
import { Product } from '../../models/Product'
import { IProductsObject } from '../../models/interfaces'
import { filterRecipes } from './search'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import './cook.scss'
import SelectedRecipe from '../../components/SelectedRecipe/SelectedRecipe'
import SuggestedRecipe from '../../components/SuggestedRecipe/SuggestedRecipe'

interface ICookProps {
  recipes: Recipe[]
}

const Cook = ({ recipes }: ICookProps): JSX.Element => {
  const {
    userProducts,
    selectedRecipes,
    setSelectedRecipes,
    setSelectedProducts,
    shoppingList,
    setShoppingList,
    localUserProducts,
    setLocalUserProducts } = useContext(AppContext)! // eslint-disable-line
  const [possibleRecipes, setPossibleRecipes] = useState<Recipe[]>([])
  const [extraProductRecipes, setExtraProductRecipes] = useState<Recipe[]>([])
  const [extraQuantityRecipes, setExtraQuantityRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    if (localUserProducts == null) return
    const searchResult = filterRecipes(localUserProducts, recipes, 2)
    setPossibleRecipes(searchResult.matchingRecipes)
    setExtraProductRecipes(searchResult.missingIngredientsRecipes)
    setExtraQuantityRecipes(searchResult.missingQuantityRecipes)
  }, [localUserProducts])

  useEffect(() => {
    const currentlySelectedRecipes = [...selectedRecipes]
    const selectedProductObject = currentlySelectedRecipes.flatMap((r: Recipe) => r.products).reduce((acc: IProductsObject, p: Product) => ({ ...acc, [p.id]: { ...p, quantity: p.quantity + (acc[p.id]?.quantity ?? 0) } }), {}) // eslint-disable-line

    setSelectedProducts(selectedProductObject)
  }, [selectedRecipes])

  const possibleRecipesCards = possibleRecipes.map(recipe =>
    <RecipeCard
    key={recipe.id}
    recipe={recipe}
    localUserProducts={localUserProducts}
    setLocalUserProducts={setLocalUserProducts}
    selectedRecipes={selectedRecipes}
    setSelectedRecipes={setSelectedRecipes}
    />)

  const selectedRecipesCards = selectedRecipes.map(recipe =>
    <SelectedRecipe
    key={recipe.id}
    selectedRecipe={recipe}
    userProducts={localUserProducts}
    setUserProducts={setLocalUserProducts}
    selectedRecipes={selectedRecipes}
    setSelectedRecipes={setSelectedRecipes}
    />
  )

  const extraProductsRecipesCards = extraProductRecipes.map(recipe =>
    <SuggestedRecipe
    key={recipe.id}
    recipe={recipe}
    userProducts={userProducts}
    shoppingList={shoppingList}
    setShoppingList={setShoppingList}
    category='extra-products'/>
  )

  const extraQuantityRecipesCards = extraQuantityRecipes.map(recipe =>
    <SuggestedRecipe
    key={recipe.id}
    recipe={recipe}
    userProducts={userProducts}
    shoppingList={shoppingList}
    setShoppingList={setShoppingList}
    category='extra-quantity'/>
  )

  return (
    <>
      <h1>My pot</h1>
      <section className='cook'>
        <section className='user-products'>
          <h1>Available products</h1>
          { localUserProducts.length > 0 &&
            <ul>
              { localUserProducts.map(ingredient => { return <li key={ingredient.id}>{ingredient.name}, {ingredient.quantity} {ingredient.unit}</li> }) }
            </ul>
          }
        </section>
        <section className='possible-recipes-section'>
          <h1>Possible recipes</h1>
          <div className='possible-recipes'>
            { (possibleRecipesCards.length > 0) ? possibleRecipesCards : <div>No recipe found</div>}
          </div>
        </section>
        <section className='selected-recipes-section'>
          <h1>Compose your menu</h1>
          <div className='selected-recipes'>
          { selectedRecipesCards.length > 0 ? selectedRecipesCards : <div>Recipes you select will appear here</div> }
          </div>
        </section>
        <section className='extra-product-recipes-section'>
          <h1>With 2 more ingredient...</h1>
          <div className='suggested-recipes'>
          { extraProductsRecipesCards.length > 0 ? extraProductsRecipesCards : <>No recipe found</> }
          </div>
        </section>
        <section className='extra-quantity-recipes-section'>
          <h1>With a bit more of your ingredients...</h1>
          <div className='suggested-recipes'>
          { extraQuantityRecipesCards.length > 0 ? extraQuantityRecipesCards : <>No recipe found</> }
          </div>
        </section>
      </section>
    </>
  )
}

export default Cook
