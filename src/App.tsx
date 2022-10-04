import React, { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
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
}

const defaultAppContext: IAppContext = {
  userProducts: [],
  setUserProducts: () => console.warn('no setUserProducts()'),
  selectedRecipes: [],
  setSelectedRecipes: () => console.warn('no setSelectedRecipes()')
}

export const AppContext = createContext<IAppContext>(defaultAppContext)

function App (): JSX.Element {
  const [userProducts, setUserProducts] = useState<Product[] | []>(Mock.userProducts)
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[] | []>([])

  return (
    <>
      <AppContext.Provider value={{ userProducts, setUserProducts, selectedRecipes, setSelectedRecipes }}>
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
