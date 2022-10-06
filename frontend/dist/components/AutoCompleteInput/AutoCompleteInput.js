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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
var AutoCompleteInput = function (_a) {
    var value = _a.value, setValue = _a.setValue, ingredientsTable = _a.ingredientsTable, id = _a.id;
    var _b = useState([]), result = _b[0], setResult = _b[1];
    function handleInputChange(event) {
        var inputValue = event.target.value;
        setValue(inputValue);
        if (inputValue.length > 1) {
            // Search for matching ingredients in the table
            var matchingIngredients = ingredientsTable.filter(function (ingredient) { return ingredient.name.includes(inputValue); });
            setResult(matchingIngredients);
        }
        else
            setResult([]);
    }
    return (_jsxs(_Fragment, { children: [_jsx("input", { id: id, type: "text", value: value, onChange: function (event) { return handleInputChange(event); } }), result.length > 0 &&
                _jsx("ul", { children: result.map(function (ingredient) {
                        return _jsx("li", __assign({ onClick: function (e) { return setValue(ingredient.name); } }, { children: ingredient.name }), "ingredient-".concat(ingredient.id));
                    }) })] }));
};
export default AutoCompleteInput;
