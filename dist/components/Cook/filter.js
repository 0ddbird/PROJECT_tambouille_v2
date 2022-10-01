/*   const myIngredients = [{ id: 0, quantity: 2 }, { id: 1, quantity: 3 }]
  const myRecipes = [
    {
      id: 0,
      name: 'maching recipe matching one ingredient, same quantity',
      ingredients: [{ id: 0, quantity: 2 }]
    },
    {
      id: 1,
      name: 'matching recipe, matching all ingredients, lesser quantity required',
      ingredients: [{ id: 0, quantity: 1 }, { id: 1, quantity: 3 }]
    },
    {
      id: 2,
      name: 'non-matching recipe, missing 1 quantity',
      ingredients: [{ id: 0, quantity: 1 }, { id: 1, quantity: 4 }]
    },
    {
      id: 3,
      name: 'non-matching recipe, missing 1 ingredient',
      ingredients: [{ id: 0, quantity: 1 }, { id: 1, quantity: 3 }, { id: 3, quantity: 1 }]
    }
  ] */
/*
  * Matching recipe pattern :
  * Recipe including 1 to every ingredients from userProducts
  * AND
  * Quantity of each matching userIngredient is greater or equal to recipe ingredient quantity
  * ---------
  * userProducts = [{id: number, quantity: number}, {id: number, quantity: number}]
  * recipeIngredients = [{id: number, quantity: number}, {id: number, quantity: number}, {id: number, quantity: number}]
  * -------------
  * We can filter out all recipes with ingredients count > userProducts
  * Then we need to filter the recipes containing all userProducts or less
  */
export function filterRecipes(userProducts, recipes) {
    var userProductsIds = userProducts.map(function (ingredient) {
        return ingredient.id;
    });
    // Returns an array of recipes which ingredients match the user available products
    var matchingRecipes = recipes.filter(function (recipe) {
        return recipe.getProductsIds().every(function (id) { return userProductsIds.includes(id); });
    });
    var matchingQuantities = matchingRecipes.filter(function (recipe) {
        // return if the required recipe product quantity is smaller than or equals to the available user product quantity
        return recipe.getProducts().every(function (recipeProduct) {
            // have to find how to compare the recipe "product" with the right user product : they share the same id
            var currentUserProduct = userProducts.find(function (userProduct) { return userProduct.id === recipeProduct.id; });
            if (currentUserProduct == null)
                return false;
            else {
                var currentUserQuantity = currentUserProduct.quantity;
                var currentRecipeProductQuantity = recipeProduct.quantity;
                if (currentUserQuantity >= currentRecipeProductQuantity)
                    return true;
                return false;
            }
        });
    });
    return matchingQuantities;
}
