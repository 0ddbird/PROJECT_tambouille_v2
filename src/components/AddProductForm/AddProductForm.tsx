import React, { useState } from 'react'
import { Ingredient } from '../../models/Ingredient'
import { Product } from '../../models/Product'
import './add-product-form.scss'
interface IInputProps {
  userProducts: Product[]
  setUserProducts: (Product: Product[]) => void
  ingredients: Ingredient[]
}

const AddProductForm = ({ userProducts, setUserProducts, ingredients }: IInputProps): JSX.Element => {
  const [result, setResult] = useState<Ingredient[]>([])
  const [productName, setProductName] = useState<string>('')
  const [productQuantity, setProductQuantity] = useState<number>(1)

  function handleInputChange (event: React.ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value
    setProductName(inputValue)
    let matchingIngredients: Ingredient[]
    // Search for matching ingredients in the table
    if (inputValue.length < 1) matchingIngredients = []
    else matchingIngredients = ingredients.filter(ingredient => ingredient.name.includes(inputValue))
    setResult(matchingIngredients)
  }

  function handleQuantityChange (event: React.ChangeEvent<HTMLInputElement>): void {
    const intValue = parseInt(event.target.value)
    if (isNaN(intValue) || intValue < 1) return
    setProductQuantity(intValue)
  }

  function handleOptionClick (name: string): void {
    setProductName(name)
    setResult([])
  }

  function handleNewIngredientFormSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    // Check if the product that the user wants to add exists in the catalog
    const catalogMatchingIngredient = ingredients.find(ingredient => ingredient.name === productName)
    if (catalogMatchingIngredient == null) return

    // Check if this products already exists in the userProducts array
    const productToUpdateIndex = userProducts.findIndex(ingredient => ingredient.id === catalogMatchingIngredient.id)

    if (productToUpdateIndex !== -1) {
      // userProducts already has matching ingredient in it : update product quantity only
      const newUserProducts: Product[] = [...userProducts]
      const productToUpdate = newUserProducts[productToUpdateIndex]
      newUserProducts[productToUpdateIndex] =
        {
          ...productToUpdate,
          quantity: productToUpdate.quantity + productQuantity
        }
      setUserProducts(newUserProducts)
    } else {
      // userProducts exists has no matching ingredient yet : add new product object
      const newProduct: Product =
      {
        ...{ ...catalogMatchingIngredient },
        quantity: productQuantity
      }
      setUserProducts([...userProducts, newProduct])
    }
  }

  return (
    <form id='add-products-form' onSubmit={handleNewIngredientFormSubmit}>
      <label htmlFor='product-name-input'>Product</label>
      <label htmlFor='product-quantity-input'>Quantity</label>
      <div className='product-inputs-container'>
        <input id='product-name-input' autoComplete='off'type="text" placeholder={'pasta,...'}value={productName} onChange={handleInputChange}/>
        <div className='product-name-options-container'>
        {
          result.length > 0 &&
              result.map(ingredient => {
                return <div className='product-name-option' key={`ingredient-${ingredient.id}`} onClick={() => handleOptionClick(ingredient.name)}>{ingredient.name}</div>
              })
        }
        </div>
        <input type='number' id="product-quantity-input" min='1' value={productQuantity} onChange= {(event) => handleQuantityChange(event)}/>
        <button type='submit' id="product-submit-button">Add</button>
      </div>
    </form>
  )
}

export default AddProductForm
