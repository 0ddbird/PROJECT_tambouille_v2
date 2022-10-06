import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { filterRecipes } from './filter';
import RecipeArticle from '../RecipeArticle/RecipeArticle';
/*
* This component displays possible recipes based on the user's available ingredients
* When the user selects a recipe and click on the 'cook' button, the ingredients are consumed and removed from the pantry
*/
var Cook = function (_a) {
    var recipes = _a.recipes, ingredientsTable = _a.ingredientsTable, userProducts = _a.userProducts, setUserProducts = _a.setUserProducts;
    var _b = useState([]), possibleRecipes = _b[0], setPossibleRecipes = _b[1];
    useEffect(function () {
        if (userProducts == null)
            return;
        var matchingRecipes = filterRecipes(userProducts, recipes);
        setPossibleRecipes(matchingRecipes);
    }, [userProducts]);
    return (_jsxs("div", { children: [_jsx("h1", { children: "Cook!" }), _jsx("h2", { children: "Your products" }), (userProducts != null && userProducts.length > 0) &&
                _jsx("ul", { children: userProducts.map(function (ingredient) {
                        return _jsxs("li", { children: [ingredientsTable[ingredient.id].name, ", ", ingredient.quantity] }, ingredient.id);
                    }) }), _jsx("h2", { children: "Possible recipes" }), _jsx("section", { children: (possibleRecipes.length > 0) &&
                    possibleRecipes.map(function (recipe) { return _jsx(RecipeArticle, { recipe: recipe, userProducts: userProducts, setUserProducts: setUserProducts }, recipe.id); }) })] }));
};
export default Cook;
