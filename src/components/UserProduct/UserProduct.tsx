import React, { useState } from 'react'
import { Product } from '../../models/Product'

interface IUserProductProps {
  product: Product
  userProducts: Product[] | []
  setUserProducts: (Product: Product[] | []) => void
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
      <span className='user-product-name'>{product.name}</span>
      <form className='user-product-quantity-form'>
        <input className='user-product-quantity-input' type='number' min='1' value={productQuantity} onChange={(e) => handleProductQuantityChange(e)}/>
        <span className='user-product-unit'>{product.unit}</span>
        <button type='button' className='user-product-remove-button' onClick={handleDeleteProduct}>X</button>
      </form>
    </article>
  )
}

export default UserProduct
