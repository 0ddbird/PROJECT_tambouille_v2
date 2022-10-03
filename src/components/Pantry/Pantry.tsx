import React from 'react'
import { Ingredient } from '../../models/Ingredient'
import { IProduct } from '../../models/interfaces'
import AddProductForm from '../AddProductForm/AddProductForm'
import './pantry.scss'

/*
* In this component, the user can read, create, modify and delete the ingredients in his/her possession.
* An ingredient must have a quantity linked to it.
* The list of ingredients must be available in the Cook component to suggest recipes.
* An ingredient will look like this : {name: 'apple', quantity: 3}
*/

interface IPantryProps {
  ingredientsTable: Ingredient[]
  userProducts: IProduct[] | []
  setUserProducts: React.Dispatch<React.SetStateAction<IProduct[] | []>>
}

const Pantry = ({ ingredientsTable, userProducts, setUserProducts }: IPantryProps): JSX.Element => {
  return (
  <section className='pantry'>
    <h1>Pantry</h1>
        <AddProductForm userProducts={userProducts} setUserProducts={setUserProducts} ingredientsTable={ingredientsTable}/>
    {
      (userProducts != null && userProducts.length > 0) &&
      <>
        <h2>Your ingredients</h2>
        <ul>
          {
            userProducts.map((product) => {
              return <li key={product.id}>{ingredientsTable[product.id].name}, {product.quantity.toString()}</li>
            })
          }
        </ul>
      </>
    }
  </section>
  )
}

export default Pantry
