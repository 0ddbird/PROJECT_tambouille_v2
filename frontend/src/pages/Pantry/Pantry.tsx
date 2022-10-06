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
    setUserProducts={setUserProducts}/>
  )

  return (
  <section id='pantry' className='page'>
    <h1 className='section-heading'>My pantry</h1>
    <AddProductForm userProducts={userProducts} setUserProducts={setUserProducts} ingredients={ingredients}/>

    <section id='pantry-products-container'>
    <h2 className='section-subheading'>My products</h2>
      { (userProducts.length > 0) ? <>{userProductCards}</> : <div>You have no product yet.</div> }
    </section>

  </section>
  )
}

export default Pantry
