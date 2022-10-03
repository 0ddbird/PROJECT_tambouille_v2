import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Nav from './components/Nav/Nav'
import Pantry from './components/Pantry/Pantry'
import Cook from './components/Cook/Cook'
import { IProduct } from './models/interfaces'

import Mock from './mocks'

function App (): JSX.Element {
  const [userProducts, setUserProducts] = useState<IProduct[] | []>(Mock.userProducts)
  return (
    <>
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/my-pantry' element=
          {
            <Pantry
            ingredientsTable={Mock.ingredientsTable}
            userProducts={userProducts}
            setUserProducts={setUserProducts}/>
          } />
          <Route path='/cook' element=
          {
            <Cook
            ingredientsTable={Mock.ingredientsTable}
            userProducts={userProducts}
            setUserProducts={setUserProducts}
            recipes={Mock.recipes}/>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
