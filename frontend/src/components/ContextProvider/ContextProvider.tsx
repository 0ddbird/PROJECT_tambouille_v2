import React, { createContext, useEffect, useState } from 'react'
import { Product } from '../../models/Product'
import { Recipe } from '../../models/Recipe'
import { IProductsObject } from '../../models/interfaces'
import Mock from '../../mocks'
import rfdc from 'rfdc'

interface IAppContext {
  userProducts: Product[]
  setUserProducts: React.Dispatch<React.SetStateAction<Product[]>>
  selectedRecipes: Recipe[]
  setSelectedRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
  selectedProducts: IProductsObject
  setSelectedProducts: React.Dispatch<React.SetStateAction<IProductsObject>>
  shoppingList: IProductsObject
  setShoppingList: React.Dispatch<React.SetStateAction<IProductsObject>>
  localUserProducts: Product[]
  setLocalUserProducts: React.Dispatch<React.SetStateAction<Product[]>>
  purchasedProducts: number[]
  setPurchasedProducts: React.Dispatch<React.SetStateAction<number[]>>
}

export const AppContext = createContext<IAppContext | undefined>(undefined)

interface IContextProps {
  children: React.ReactNode
}

const ContextProvider = ({ children }: IContextProps): JSX.Element => {
  const [userProducts, setUserProducts] = useState<Product[]>(Mock.userProducts)
  const [localUserProducts, setLocalUserProducts] = useState<Product[]>(rfdc()(userProducts))
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([])
  const [selectedProducts, setSelectedProducts] = useState<IProductsObject>({})
  const [shoppingList, setShoppingList] = useState<IProductsObject>({})
  const [purchasedProducts, setPurchasedProducts] = useState<number[]>([])

  useEffect(() => {
    setLocalUserProducts(rfdc()(userProducts))
    setSelectedRecipes([])
  }, [userProducts])
  return (
    <AppContext.Provider value={
    {
      userProducts,
      setUserProducts,
      selectedRecipes,
      setSelectedRecipes,
      selectedProducts,
      setSelectedProducts,
      shoppingList,
      setShoppingList,
      localUserProducts,
      setLocalUserProducts,
      purchasedProducts,
      setPurchasedProducts
    }
    }>
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider
