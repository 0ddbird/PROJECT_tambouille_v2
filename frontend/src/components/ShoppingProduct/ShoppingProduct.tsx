import React, { useState } from 'react'
import { IProductsObject } from '../../models/interfaces'
import { Product } from '../../models/Product'
import rfdc from 'rfdc'
import './shopping-product.scss'

interface IShoppingProductProps {
  product: Product
  shoppingList: IProductsObject
  setShoppingList: React.Dispatch<React.SetStateAction<IProductsObject>>
  userProducts: Product[]
  setUserProducts: React.Dispatch<React.SetStateAction<Product[]>>
  purchasedProducts: number[]
  setPurchasedProducts: React.Dispatch<React.SetStateAction<number[]>>
}

const ShoppingProduct = ({ product, shoppingList, setShoppingList, userProducts, setUserProducts, purchasedProducts, setPurchasedProducts }: IShoppingProductProps): JSX.Element => {
  const [hasBeenPurchased, setHasBeenPurchased] = useState(purchasedProducts.includes(product.id))
  function removeFromShoppingList (product: Product): void {
    const updatedShoppingList = rfdc()(shoppingList)
    if (product.id in shoppingList) delete updatedShoppingList[product.id] // eslint-disable-line
    setShoppingList(updatedShoppingList)
  }

  function handleShoppingProductState (e: React.ChangeEvent<HTMLInputElement>, product: Product): void {
    const isPurchased = e.target.checked
    const updatedUserProducts = rfdc()(userProducts)
    const updatedPurchasedProducts = rfdc()(purchasedProducts)
    const productAlreadyInPantry = updatedUserProducts.find(userProduct => userProduct.id === product.id)
    const productAlreadyInPantryIndex = updatedUserProducts.findIndex(userProducts => userProducts.id === product.id)

    if (isPurchased && productAlreadyInPantry != null) {
      productAlreadyInPantry.quantity += product.quantity
      updatedPurchasedProducts.push(product.id)
    } else if (isPurchased && productAlreadyInPantry == null) {
      updatedUserProducts.push(product)
      updatedPurchasedProducts.push(product.id)
    } else if (!isPurchased && productAlreadyInPantry != null) {
      productAlreadyInPantry.quantity -= product.quantity
      if (productAlreadyInPantry.quantity <= 0) updatedUserProducts.splice(productAlreadyInPantryIndex, 1)
      const currentPurchasedProductIndex = updatedPurchasedProducts.findIndex(index => index === product.id)
      if (currentPurchasedProductIndex !== -1) updatedPurchasedProducts.splice(currentPurchasedProductIndex, 1)
    }
    setUserProducts(updatedUserProducts)
    setPurchasedProducts(updatedPurchasedProducts)
    setHasBeenPurchased(!hasBeenPurchased)
  }
  return (
    <li className='shopping-list-item'>
      <input className='shopping-list-checkbox' type='checkbox' checked={hasBeenPurchased} onChange={(e) => handleShoppingProductState(e, product)} />
      <span className={hasBeenPurchased ? 'shopping-product-purchased' : 'shopping-product'}>{`${product.name} x${product.quantity}${product.unit}`}</span>
      <button className='shopping-product-remove-button' type='button' onClick={() => removeFromShoppingList(product)}>Remove</button>
    </li>
  )
}

export default ShoppingProduct
