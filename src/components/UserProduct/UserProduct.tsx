import React, { useState } from 'react'
import { Product } from '../../models/Product'
import './user-product.scss'

interface IUserProductProps {
  product: Product
  userProducts: Product[]
  setUserProducts: (Product: Product[]) => void
}

const UserProduct = ({ product, userProducts, setUserProducts }: IUserProductProps): JSX.Element => {
  const [productQuantity, setProductQuantity] = useState(product.quantity)
  function handleProductQuantityChange (e: React.ChangeEvent<HTMLInputElement>): void {
    const intValue = parseInt(e.target.value)
    if (isNaN(intValue) || intValue < 1) return
    setProductQuantity(intValue)
    const newUserProducts = [...userProducts]
    const indexOfProduct = newUserProducts.findIndex(targetProduct => targetProduct.id === product.id)
    const targetProduct = newUserProducts[indexOfProduct]
    newUserProducts[indexOfProduct] = {
      ...targetProduct,
      quantity: intValue
    }
    setUserProducts(newUserProducts)
  }

  function handleDeleteProduct (): void {
    const newUserProducts = [...userProducts]
    const indexOfProduct = newUserProducts.findIndex(targetProduct => targetProduct === product)
    newUserProducts.splice(indexOfProduct, 1)
    setUserProducts(newUserProducts)
  }

  return (
    <article className='user-product'>
      <div className='user-product-name-container'>
        <span className='user-product-name'>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</span>
      </div>
      <div className='user-product-quantity-input-container'>
        <input className='user-product-quantity-input' type='number' min='1' value={productQuantity} onChange={(e) => handleProductQuantityChange(e)}/>
      </div>
      <div className='user-product-unit-container'>
        <span className='user-product-unit'>{product.unit}</span>
      </div>
      <div className='user-product-remove-button-container'>
        <button type='button' className='user-product-remove-button' onClick={handleDeleteProduct}>X</button>
      </div>
    </article>
  )
}

export default UserProduct
