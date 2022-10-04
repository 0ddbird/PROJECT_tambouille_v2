import React, { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Nav from './components/Nav/Nav'
import Pantry from './pages/Pantry/Pantry'
import Cook from './pages/Cook/Cook'
import { Product } from './models/Product'
import { Recipe } from './models/Recipe'

import Mock from './mocks'
import RecipePage from './pages/Recipe/RecipePage'

interface IAppContext {
  userProducts: Product[] | []
  setUserProducts: (Product: Product[] | []) => void
  selectedRecipes: Recipe[] | []
  setSelectedRecipes: (Recipe: Recipe[] | []) => void
  shoppingList: Product[] | []
  setShoppingList: (Product: Product[] | []) => void
}

const defaultAppContext: IAppContext = {
  userProducts: [],
  setUserProducts: () => console.warn('no setUserProducts()'),
  selectedRecipes: [],
  setSelectedRecipes: () => console.warn('no setSelectedRecipes()'),
  shoppingList: [],
  setShoppingList: () => console.warn('no setShoppingList()')
}

export const AppContext = createContext<IAppContext>(defaultAppContext)

function App (): JSX.Element {
  const [userProducts, setUserProducts] = useState<Product[] | []>(Mock.userProducts)
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[] | []>([])
  const [shoppingList, setShoppingList] = useState<Product[] | []>([])

  return (
    <>
      <AppContext.Provider value={{ userProducts, setUserProducts, selectedRecipes, setSelectedRecipes, shoppingList, setShoppingList }}>
        <BrowserRouter>
        <Nav />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/my-pantry' element={<Pantry ingredients={Mock.ingredients}/>} />
            <Route path='/cook' element={<Cook recipes={Mock.recipes}/>} />
            <Route path='/recipes/:id' element={<RecipePage recipes={Mock.recipes}/>}/>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  )
}

export default App
