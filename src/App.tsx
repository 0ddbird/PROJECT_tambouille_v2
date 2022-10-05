import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Nav from './components/Nav/Nav'
import Pantry from './pages/Pantry/Pantry'
import Cook from './pages/Cook/Cook'
import Mock from './mocks'
import RecipePage from './pages/Recipe/RecipePage'
import ContextProvider from './components/ContextProvider/ContextProvider'
import ShoppingList from './pages/ShoppingList/ShoppingList'

function App (): JSX.Element {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
        <Nav />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/my-pantry' element={<Pantry ingredients={Mock.ingredients}/>} />
            <Route path='/cook' element={<Cook recipes={Mock.recipes}/>} />
            <Route path='/recipes/:id' element={<RecipePage recipes={Mock.recipes}/>}/>
            <Route path='/shopping-list' element={<ShoppingList />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  )
}

export default App
