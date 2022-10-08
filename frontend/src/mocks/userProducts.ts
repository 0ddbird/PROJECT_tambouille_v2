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

const productFour = {
  ...{ ...ingredients[16] },
  quantity: 1
}

const productFive = {
  ...{ ...ingredients[10] },
  quantity: 1
}

const productSix = {
  ...{ ...ingredients[4] },
  quantity: 1200
}

const productSeven = {
  ...{ ...ingredients[11] },
  quantity: 500
}

const productEight = {
  ...{ ...ingredients[8] },
  quantity: 250

}

const productNine = {
  ...{ ...ingredients[5] },
  quantity: 4

}

const userProducts: Product[] = [productOne, productTwo, productThree, productFour, productFive, productSix, productSeven, productEight, productNine]

export { userProducts }
