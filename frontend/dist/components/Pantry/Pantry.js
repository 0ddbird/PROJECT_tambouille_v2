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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput';
var Pantry = function (_a) {
    var ingredientsTable = _a.ingredientsTable, userProducts = _a.userProducts, setUserProducts = _a.setUserProducts;
    var _b = useState(''), newIngredientName = _b[0], setNewIngredientName = _b[1];
    var _c = useState(1), newIngredientQuantity = _c[0], setNewIngredientQuantity = _c[1];
    function handleQuantityChange(e) {
        var intValue = parseInt(e.target.value);
        if (isNaN(intValue) || intValue < 1)
            return;
        var newQuantityInt = parseInt(e.target.value);
        setNewIngredientQuantity(newQuantityInt);
    }
    function handleNewIngredientFormSubmit(e) {
        e.preventDefault();
        // Check if the added ingredient exists in the DB
        var dbIngredient = ingredientsTable.find(function (ingredient) { return ingredient.name === newIngredientName; });
        if (dbIngredient == null)
            return;
        // Build the new ingredient object to add to the user's inventory
        var newProduct = {
            id: dbIngredient.id,
            quantity: newIngredientQuantity
        };
        // ingredients is undefined
        if (userProducts === undefined) {
            userProducts = [newProduct];
        }
        else {
            // ingredients is defined and already has matching ingredient in it
            var userExistingProductIndex = userProducts.findIndex(function (ingredient) { return ingredient.id === newProduct.id; });
            if (userExistingProductIndex !== -1) {
                var userExistingProduct = userProducts[userExistingProductIndex];
                userProducts[userExistingProductIndex].quantity = userExistingProduct.quantity + newProduct.quantity;
            }
            else {
                // ingredients has no matching ingredient yet
                userProducts.push(newProduct);
            }
        }
        setUserProducts(userProducts);
    }
    return (_jsxs("div", { children: [_jsx("h1", { children: "Pantry" }), _jsxs("form", __assign({ id: 'new-ingredient-form', onSubmit: function (event) { return handleNewIngredientFormSubmit(event); } }, { children: [_jsx("label", __assign({ htmlFor: 'ingredient-input' }, { children: "Add ingredient" })), _jsx(AutoCompleteInput, { value: newIngredientName, setValue: setNewIngredientName, id: 'ingredient-input', ingredientsTable: ingredientsTable }), _jsx("label", __assign({ htmlFor: 'ingredient-quantity' }, { children: "Select quantity" })), _jsx("input", { type: 'number', id: "ingredient-quantity", min: '1', value: newIngredientQuantity, onChange: function (event) { return handleQuantityChange(event); } }), _jsx("button", __assign({ type: 'submit' }, { children: "Add" }))] })), (userProducts != null && userProducts.length > 0) &&
                _jsx("ul", { children: userProducts.map(function (product) {
                        return _jsxs("li", { children: [ingredientsTable[product.id].name, ", ", product.quantity.toString()] }, product.id);
                    }) })] }));
};
export default Pantry;
