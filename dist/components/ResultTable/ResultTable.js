var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
var ResultTable = function (_a) {
    var recipes = _a.recipes, setUserProducts = _a.setUserProducts;
    function handleRecipeClick(e) {
        var ingredients = recipe.getProducts();
        console.log(ingredients);
    }
    return (_jsx("section", { children: recipes.map(function (recipe) {
            return _jsx("article", __assign({ onClick: function (e) { return handleRecipeClick(e); } }, { children: recipe.name }), recipe.id);
        }) }));
};
export default ResultTable;
