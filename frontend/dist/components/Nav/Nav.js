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
import { NavLink } from 'react-router-dom';
var Nav = function () {
    return (_jsxs("nav", { children: [_jsx(NavLink, __assign({ to: '/' }, { children: "Home" })), _jsx(NavLink, __assign({ to: '/my-pantry' }, { children: "Pantry" })), _jsx(NavLink, __assign({ to: '/cook' }, { children: "Cook" }))] }));
};
export default Nav;
