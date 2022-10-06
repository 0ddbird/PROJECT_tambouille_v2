# Backend

- [ ] Create a swagger

Routes :

| Route                   | Request |             Payload                          |                         Response                      |             Purpose          |
|-------------------------|---------|----------------------------------------------|-------------------------------------------------------|------------------------------|
|||||
|/register               |POST  |{userEmail, userPassword}                    |201/400                                                | User registration
|/login                  |POST  |{userEmail, userPassword}                    |{userToken}                                            | User login
|||||
|/pantry/{userId}        |GET   |{userToken}                                  |{products: Product[]}                                  | Get all user products
|/pantry/{userId}        |POST  |{userToken, productID, quantity}             |201 {products: Product}                                | Add a product to the user's pantry
|/pantry/{userId}        |PUT   |{userToken,productID, quantity}              |200/400                                                | Update user products
|/pantry/{userId}        |PATCH |{userToken, productID, quantity}             |200/400                                                | Update user product quantity
|/pantry/{userId}        |DELETE|{userToken, productID}                       |200/400                                                | Delete user product
|||||
|/recipes/{userId}       |GET   |{userToken}                                  |{recipes: Recipe[], extraP: Recipe[], extraQ: Recipe[]}| Get recipes matching user products
|User shopping list||||
|/shoppinglist/{userId}/ | GET  |{userToken}                                  |{products: Product[]}                                  | Get items in shopping list
|/shoppinglist/{userId}/ |POST  |{userToken, product: {productID, quantity}}  |201 {products: Product[]}                              | Add item to the shopping list
|/shoppinglist/{userId}/ |PATCH |{userToken, product: {productID, checked}}   |{products: Product[]}                                  | Update item status in shopping list
|/shoppinglist/{userId}/ |PUT   |{userToken, product: {productID, quantity}}  |{products: Product[]}                                  | Update item quantity
|/shoppinglist/{userId}/ |DELETE|{userToken, productID}                       |{products: Product[]}                                  | Delete item from shopping list

