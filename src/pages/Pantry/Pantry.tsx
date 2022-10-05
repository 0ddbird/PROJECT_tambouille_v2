import React, { useContext } from 'react'
import { AppContext } from '../../components/ContextProvider/ContextProvider'
import { Ingredient } from '../../models/Ingredient'
import AddProductForm from '../../components/AddProductForm/AddProductForm'
import UserProduct from '../../components/UserProduct/UserProduct'
import './pantry.scss'

interface IPantryProps {
  ingredients: Ingredient[]
}

const Pantry = ({ ingredients }: IPantryProps): JSX.Element => {
  const { userProducts, setUserProducts, selectedProducts } = useContext(AppContext)! // eslint-disable-line

  const userProductCards = userProducts.map((product) =>
    <UserProduct
    key={product.id}
    product={product}
    userProducts={userProducts}
    setUserProducts={setUserProducts}
    selectedProducts={selectedProducts}/>
  )

  return (
  <section className='pantry'>
    <h1>My pantry</h1>
    <AddProductForm userProducts={userProducts} setUserProducts={setUserProducts} ingredients={ingredients}/>
    <h2>My products</h2>
    { (userProducts.length > 0) ? <div>{userProductCards}</div> : <div>You have no product yet.</div> }
  </section>
  )
}

export default Pantry
