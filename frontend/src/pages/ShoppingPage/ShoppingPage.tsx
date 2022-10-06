import React, { useContext } from 'react'
import { AppContext } from '../../components/ContextProvider/ContextProvider'
import ShoppingProduct from '../../components/ShoppingProduct/ShoppingProduct'
import { Product } from '../../models/Product'
import rfdc from 'rfdc'
import './shopping-page.scss'

const ShoppingList = (): JSX.Element => {
  const { userProducts, setUserProducts, shoppingList, setShoppingList, purchasedProducts, setPurchasedProducts} = useContext(AppContext)! // eslint-disable-line

  function handleClearPurchased (): void {
    const updatedShoppingList = rfdc()(shoppingList)
    // purchasedProducts = [1, 10, 24]
    purchasedProducts.forEach(productId => {
      if((productId in updatedShoppingList)) delete updatedShoppingList[productId] //eslint-disable-line
    })
    setShoppingList(updatedShoppingList)
    setPurchasedProducts([])
  }

  const productsArray = Object.values(shoppingList)
  const productsCards = productsArray.map((product: Product) =>
    <ShoppingProduct
    key={product.id}
    product={product}
    shoppingList={shoppingList}
    setShoppingList={setShoppingList}
    userProducts={userProducts}
    setUserProducts={setUserProducts}
    purchasedProducts={purchasedProducts}
    setPurchasedProducts={setPurchasedProducts}
    />
  )

  return (
    <section className='shopping-page'>
      <h1 className='shopping-page-heading'>Shopping List</h1>
      <div className='shopping-page-list-container'>
        { productsArray.length > 0 ? productsCards : <div>You have no items in your shopping list!</div> }
      </div>
      <button className='shopping-clear-button' type='button' onClick={handleClearPurchased}>Clear purchased</button>
    </section>
  )
}

export default ShoppingList
