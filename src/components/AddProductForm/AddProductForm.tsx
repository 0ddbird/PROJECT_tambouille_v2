import React, { useState } from 'react'
import { Ingredient } from '../../models/Ingredient'
import { IProduct } from '../../models/interfaces'

interface IInputProps {
  userProducts: IProduct[] | []
  setUserProducts: React.Dispatch<React.SetStateAction<IProduct[] | []>>
  ingredientsTable: Ingredient[]
}

const AddProductForm = ({ userProducts, setUserProducts, ingredientsTable }: IInputProps): JSX.Element => {
  const [result, setResult] = useState<Ingredient[] | []>([])
  const [optionPosition, setOptionPosition] = useState(0)
  const [productName, setProductName] = useState<string>('')
  const [productQuantity, setProductQuantity] = useState<number>(1)
  const [isFocusLocked, setIsFocusLocked] = useState(true)

  function handleInputChange (event: React.ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value
    setProductName(inputValue)
    if (inputValue.length > 1) {
      // Search for matching ingredients in the table
      const matchingIngredients = ingredientsTable.filter(ingredient => ingredient.name.includes(inputValue))
      setResult(matchingIngredients)
    } else {
      setResult([])
      setOptionPosition(0)
    }
  }

  function handleQuantityChange (e: React.ChangeEvent<HTMLInputElement>): void {
    const intValue = parseInt(e.target.value)
    if (isNaN(intValue) || intValue < 1) {
      setProductQuantity(1)
      return
    }
    setProductQuantity(intValue)
  }

  function handleNewIngredientFormSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    // Check if the product that the user wants to add exists in the catalog
    const matchingCatalogProduct = ingredientsTable.find(ingredient => ingredient.name === productName)
    if (matchingCatalogProduct == null) return

    // Check if this products already exists in the userProducts array
    const productToUpdateIndex = userProducts.findIndex(ingredient => ingredient.id === matchingCatalogProduct.id)

    if (productToUpdateIndex !== -1) {
      // userProducts already has matching ingredient in it : update product quantity only
      const newUserProducts: IProduct[] = [...userProducts]
      const productToUpdate = newUserProducts[productToUpdateIndex]
      newUserProducts[productToUpdateIndex] =
        {
          ...productToUpdate,
          quantity: productToUpdate.quantity + productQuantity
        }
      setUserProducts(newUserProducts)
    } else {
      // userProducts exists has no matching ingredient yet : add new product object
      const newProduct: IProduct =
      {
        id: matchingCatalogProduct.id,
        quantity: productQuantity
      }
      setUserProducts([...userProducts, newProduct])
    }
  }

  function handleKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
    // To fix, doesn't work backwards
    if (e.key === 'Tab' && isFocusLocked) {
      e.preventDefault()
      if (result[optionPosition] != null && optionPosition < result.length) {
        setProductName(result[optionPosition].name)
        setOptionPosition(optionPosition + 1)
      }
    } else if (e.shiftKey && e.key === 'Tab' && isFocusLocked) {
      e.preventDefault()
      if (result[optionPosition - 1] != null && optionPosition > 0) {
        setProductName(result[optionPosition - 1].name)
        setOptionPosition(optionPosition - 1)
      }
    } else if (e.key === 'Enter') {
      setIsFocusLocked(false)
    }
  }

  return (
    <form id='add-products-form' onSubmit={(event) => handleNewIngredientFormSubmit(event)}>
      <label htmlFor='product-name-input'>Product</label>
      <label htmlFor='product-quantity-input'>Quantity</label>
      <div className='product-inputs-container'>
        <input id='product-name-input' autoComplete='off' onKeyDown={(e) => handleKeyDown(e)} type="text" value={productName} onChange={(event) => handleInputChange(event)}/>
        <div className='product-name-options-container'>
        {
          result.length > 0 &&
              result.map(ingredient => {
                return <div className='autocomplete-select-option' key={`ingredient-${ingredient.id}`} onClick={(e) => setProductName(ingredient.name)}>{ingredient.name}</div>
              })
        }
        </div>
        <input type='number' id="product-quantity-input" min='1' value={productQuantity} onChange= {(event) => handleQuantityChange(event)}></input>
        <button type='submit' id="product-submit-button">Add product</button>
      </div>
    </form>
  )
}

export default AddProductForm
