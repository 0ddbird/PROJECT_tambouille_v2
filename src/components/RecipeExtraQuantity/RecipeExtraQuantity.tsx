import * as React from 'react'
import { Recipe } from '../../models/Recipe'
import { Product } from '../../models/Product'
import { IProductsObject } from '../../models/interfaces'
import rfdc from 'rfdc'
import Cart from '../../assets/cart-arrow-down-solid.svg'

interface IRecipeExtraQuantityProps {
  recipe: Recipe
  userProducts: Product[]
  shoppingList: IProductsObject
  setShoppingList: React.Dispatch<React.SetStateAction<IProductsObject>>
  category: string
}

const RecipeExtraQuantity = ({ recipe, userProducts, shoppingList, setShoppingList, category }: IRecipeExtraQuantityProps): JSX.Element => {
  function addQuantityToShoppingList (recipe: Recipe): void {
    const updatedShoppingList = rfdc()(shoppingList)

    // Option to add : if (userProducts + products in shopping list quantities) % recipe products quantities === 0 => add full quantities

    const recipeProductsIds = recipe.getProductsIds()
    const matchingUserProducts = userProducts.filter(product => recipeProductsIds.includes(product.id))
    const productWithNewQuantity = matchingUserProducts.map(matchingProduct => {
      const indexOfMatchingProduct = matchingUserProducts.findIndex(product => product.id === matchingProduct.id)
      return {
        ...matchingProduct,
        quantity: recipe.products[indexOfMatchingProduct].quantity - matchingProduct.quantity
      }
    })
    productWithNewQuantity.forEach(product => {
      if (product.quantity <= 0) return
      if ((product.id in updatedShoppingList)) updatedShoppingList[product.id].quantity += product.quantity
      else if (!(product.id in updatedShoppingList)) updatedShoppingList[product.id] = { ...product }
    })
    setShoppingList(updatedShoppingList)
  }
  return (
    <article className='extra-recipe'>
      <h1 className='extra-recipe-heading'>{recipe.name}</h1>
      <section className='extra-ingredients-container'>
        <ul className='extra-recipe-ingredients'>
          {
            recipe.products.map(product => {
              return <li className='extra-recipe-ingredient' key={`${category} ${product.id}`}>{`${product.name} x${product.quantity}${product.unit}`}</li>
            })
          }
        </ul>
      </section>
      <button type='button' className='extra-recipe-button' onClick={() => addQuantityToShoppingList(recipe)}>
        <img className='cartIcon' src={Cart} alt='add-to-list' />
      </button>
    </article>
  )
}

export default RecipeExtraQuantity
