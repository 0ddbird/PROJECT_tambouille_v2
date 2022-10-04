import React, { useContext } from 'react'
import { AppContext } from '../../App'
import { Ingredient } from '../../models/Ingredient'
import AddProductForm from '../AddProductForm/AddProductForm'
import UserProduct from '../UserProduct/UserProduct'
import './pantry.scss'

/*
* In this component, the user can read, create, modify and delete the ingredients in his/her possession.
* An ingredient must have a quantity linked to it.
* The list of ingredients must be available in the Cook component to suggest recipes.
* An ingredient will look like this : {name: 'apple', quantity: 3}
*/

interface IPantryProps {
  ingredients: Ingredient[]
}

const Pantry = ({ ingredients }: IPantryProps): JSX.Element => {
  const { userProducts, setUserProducts } = useContext(AppContext)

  return (
  <section className='pantry'>
    <h1>Pantry</h1>
    <AddProductForm userProducts={userProducts} setUserProducts={setUserProducts} ingredients={ingredients}/>
    <h2>Your products</h2>
    { (userProducts.length > 0)
      ? <div>
          {
            userProducts.map((product) => {
              return <UserProduct key={product.id} product={product} userProducts={userProducts} setUserProducts={setUserProducts}/>
            })
          }
        </div>
      : <div>You have no product yet.</div>
    }
  </section>
  )
}

export default Pantry
