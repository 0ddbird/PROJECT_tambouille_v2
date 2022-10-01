import React, { useState } from 'react'
import { Ingredient } from '../../models/Ingredient'
import { IProduct } from '../../models/interfaces'
import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput'

/*
* In this component, the user can read, create, modify and delete the ingredients in his/her possession.
* An ingredient must have a quantity linked to it.
* The list of ingredients must be available in the Cook component to suggest recipes.
* An ingredient will look like this : {name: 'apple', quantity: 3}
*/

interface IPantryProps {
  ingredientsTable: Ingredient[]
  userProducts: IProduct[] | undefined
  setUserProducts: React.Dispatch<React.SetStateAction<IProduct[] | undefined>>
}

const Pantry = ({ ingredientsTable, userProducts, setUserProducts }: IPantryProps): JSX.Element => {
  const [newIngredientName, setNewIngredientName] = useState<string>('')
  const [newIngredientQuantity, setNewIngredientQuantity] = useState<number>(1)

  function handleQuantityChange (e: React.ChangeEvent<HTMLInputElement>): void {
    const intValue = parseInt(e.target.value)
    if (isNaN(intValue) || intValue < 1) return
    const newQuantityInt = parseInt(e.target.value)
    setNewIngredientQuantity(newQuantityInt)
  }

  function handleNewIngredientFormSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    // Check if the added ingredient exists in the DB
    const dbIngredient = ingredientsTable.find(ingredient => ingredient.name === newIngredientName)
    if (dbIngredient == null) return

    // Build the new ingredient object to add to the user's inventory
    const newProduct: IProduct = {
      id: dbIngredient.id,
      quantity: newIngredientQuantity
    }

    // ingredients is undefined
    if (userProducts === undefined) {
      userProducts = [newProduct]
    } else {
      // ingredients is defined and already has matching ingredient in it
      const userExistingProductIndex = userProducts.findIndex(ingredient => ingredient.id === newProduct.id)
      if (userExistingProductIndex !== -1) {
        const userExistingProduct = userProducts[userExistingProductIndex]
        userProducts[userExistingProductIndex].quantity = userExistingProduct.quantity + newProduct.quantity
      } else {
        // ingredients has no matching ingredient yet
        userProducts.push(newProduct)
      }
    }
    setUserProducts(userProducts)
  }

  return (
  <div>
    <h1>Pantry</h1>
    <form id='new-ingredient-form' onSubmit={(event) => handleNewIngredientFormSubmit(event)}>
      <label htmlFor='ingredient-input'>Add ingredient</label>
      <AutoCompleteInput value={newIngredientName} setValue={setNewIngredientName} id={'ingredient-input'} ingredientsTable={ingredientsTable}/>
      <label htmlFor='ingredient-quantity'>Select quantity</label>
      <input type='number' id="ingredient-quantity" min='1' value={newIngredientQuantity} onChange= {(event) => handleQuantityChange(event)}></input>
      <button type='submit'>Add</button>
    </form>

    {
      (userProducts != null && userProducts.length > 0) &&
      <ul>
        {
          userProducts.map((product) => {
            return <li key={product.id}>{ingredientsTable[product.id].name}, {product.quantity.toString()}</li>
          })
        }
      </ul>
    }
  </div>
  )
}

export default Pantry
