import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../components/ContextProvider/ContextProvider'
import { Recipe } from '../../models/Recipe'
import { Product } from '../../models/Product'
import { IProductsObject } from '../../models/interfaces'
import { filterRecipes } from './search'
import PossibleRecipe from '../../components/Cook/PossibleRecipe/PossibleRecipe'
import SelectedRecipe from '../../components/Cook/SelectedRecipe/SelectedRecipe'
import RecipeExtraProduct from '../../components/Cook/ExtraPRecipe/ExtraPRecipe'
import RecipeExtraQuantity from '../../components/Cook/ExtraQRecipe/ExtraQRecipe'
import './cook.scss'
import rfdc from 'rfdc'

interface ICookProps {
  recipes: Recipe[]
}

const Cook = ({ recipes }: ICookProps): JSX.Element => {
  const {
    userProducts,
    setUserProducts,
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
  const [threshold, setThreshold] = useState(1)
  useEffect(() => {
    if (localUserProducts == null) return
    const searchResult = filterRecipes(localUserProducts, recipes, threshold)
    setPossibleRecipes(searchResult.matchingRecipes)
    setExtraProductRecipes(searchResult.missingIngredientsRecipes)
    setExtraQuantityRecipes(searchResult.missingQuantityRecipes)
  }, [localUserProducts, threshold, selectedRecipes])

  useEffect(() => {
    const currentlySelectedRecipes = [...selectedRecipes]
    const selectedProductObject = currentlySelectedRecipes
      .flatMap((r: Recipe) => r.products)
      .reduce((acc: IProductsObject, p: Product) => ({ ...acc, [p.id]: { ...p, quantity: p.quantity + (acc[p.id]?.quantity ?? 0) } }), {}) // eslint-disable-line
    setSelectedProducts(selectedProductObject)
  }, [selectedRecipes])

  function handleCookSelected (): void {
    const updatedSelectedRecipes = rfdc()(selectedRecipes)
    const updatedUserProducts = rfdc()(userProducts)
    const selectedRecipesProducts = updatedSelectedRecipes
      .flatMap((r: Recipe) => r.products)
      .reduce((acc: IProductsObject, p: Product) => ({ ...acc, [p.id]: { ...p, quantity: p.quantity + (acc[p.id]?.quantity ?? 0) } }), {}) // eslint-disable-line
    console.log(selectedRecipesProducts)
    updatedUserProducts.forEach((product) => {
      if (!(product.id in selectedRecipesProducts)) return
      product.quantity -= selectedRecipesProducts[product.id].quantity
    })
    const newUserProducts = updatedUserProducts.filter(product => product.quantity > 0)
    setUserProducts(newUserProducts)
    setSelectedRecipes([])
  }

  const possibleRecipesCards = possibleRecipes.map(recipe =>
    <PossibleRecipe
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
    <RecipeExtraProduct
    key={recipe.id}
    recipe={recipe}
    userProducts={userProducts}
    shoppingList={shoppingList}
    setShoppingList={setShoppingList}
    category='extra-products'/>
  )

  const extraQuantityRecipesCards = extraQuantityRecipes.map(recipe =>
    <RecipeExtraQuantity
    key={recipe.id}
    recipe={recipe}
    userProducts={userProducts}
    shoppingList={shoppingList}
    setShoppingList={setShoppingList}
    category='extra-quantity'/>
  )

  return (
    <>
      <section className='page' id='cook'>
        <section id='cook_products-section' className='cook_section'>
          <h1 className='cook_heading'>My ingredients</h1>
          { localUserProducts.length > 0 &&
            <div id='cook_user-products-list'>
              { localUserProducts.map(ingredient => { return <div key={ingredient.id}>{ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}, {ingredient.quantity}{ingredient.unit}</div> }) }
            </div>
          }
        </section>
        <section id='cook_menu-section' className='cook_section'>
          <h1 className='cook_heading'>Today&apos;s menu</h1>
          <div id='cook_menu-recipes-container'>
            { selectedRecipesCards.length > 0 ? selectedRecipesCards : <div>Recipes you select will appear here</div> }
            { selectedRecipesCards.length > 0 && <button className='cook_menu-button' onClick={handleCookSelected}>Cook!</button> }
          </div>
        </section>
        <section id='cook_recipes-section' className='cook_section'>
          <h1 className='cook_heading'>Possible recipes</h1>
          <div className='cook_recipes-container'>
            { (possibleRecipesCards.length > 0) ? possibleRecipesCards : <div>No recipe found</div>}
          </div>
        </section>
        <section id='cook_extra-q-recipes-section' className='cook_section'>
          <h1 className='cook_heading'>With more quantities...</h1>
          <div className='cook_recipes-container'>
            { extraQuantityRecipesCards.length > 0 && extraQuantityRecipesCards }
          </div>
        </section>
        <section id='cook_extra-p-recipes-section' className='cook_section'>
          <h1 className='cook_heading'>With
          <input type='number' min='1' max='3' className='threshold-input' value={threshold} onChange={(e) => setThreshold(isNaN(parseInt(e.target.value)) ? 1 : parseInt(e.target.value))}/>
          more ingredient{threshold > 1 ? 's' : ''}...</h1>
          <div className='cook_recipes-container'>
            { extraProductsRecipesCards.length > 0 && extraProductsRecipesCards }
          </div>
        </section>

      </section>
    </>
  )
}

export default Cook
