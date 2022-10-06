import { Product } from '../models/Product'
import { ingredients } from './ingredients'

const productOne = {
  ...{ ...ingredients[0] },
  quantity: 200
}

const productTwo = {
  ...{ ...ingredients[1] },
  quantity: 6
}

const productThree = {
  ...{ ...ingredients[2] },
  quantity: 900
}

const userProducts: Product[] = [productOne, productTwo, productThree]

export { userProducts }
