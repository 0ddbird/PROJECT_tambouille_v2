import * as React from 'react'
import { Recipe } from '../../../models/Recipe'
import { Product } from '../../../models/Product'
import { IProductsObject } from '../../../models/interfaces'
import rfdc from 'rfdc'
import './extraPRecipe.scss'
import Cart from '../../../assets/cart-arrow-down-solid.svg'

interface IExtraPRecipeProps {
  recipe: Recipe
  userProducts: Product[]
  shoppingList: IProductsObject
  setShoppingList: React.Dispatch<React.SetStateAction<IProductsObject>>
  category: string
}

const ExtraPRecipe = ({ recipe, userProducts, shoppingList, setShoppingList, category }: IExtraPRecipeProps): JSX.Element => {
  function addToShoppingList (recipe: Recipe): void {
    const currentShoppingList = rfdc()(shoppingList)
    const userProductsIds = userProducts.map(product => product.id)
    const extraProducts = recipe.products.filter(product => !userProductsIds.includes(product.id))
    const extraProductsIds = extraProducts.map(product => product.id)
    recipe.products.forEach(product => {
      if ((product.id in currentShoppingList) && extraProductsIds.includes(product.id)) currentShoppingList[product.id].quantity += product.quantity
      else if (!(product.id in currentShoppingList) && extraProductsIds.includes(product.id)) currentShoppingList[product.id] = { ...product }
    })
    setShoppingList(currentShoppingList)
  }
  return (
    <article className='extra-recipe'>
      <h1 className='extra-recipe-heading'>{recipe.name}</h1>
      <section className='extra-ingredients-container'>
        <ul className='extra-recipe-ingredients'>
          {
            recipe.products.map(product => {
              return <li className='extra-recipe-ingredient' key={`${category} ${product.id}`}>{`${product.name.charAt(0).toUpperCase() + product.name.slice(1)} x${product.quantity}${product.unit}`}</li>
            })
          }
        </ul>
      </section>
      <button type='button' className='extra-recipe-button' onClick={() => addToShoppingList(recipe)}>
        <img className='cartIcon' src={Cart} alt='add-to-list' />
      </button>
    </article>
  )
}

export default ExtraPRecipe
