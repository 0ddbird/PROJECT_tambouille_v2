import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Pantry from './components/Pantry/Pantry';
import Cook from './components/Cook/Cook';
import Mock from './mocks';
function App() {
    var _a = useState(Mock.userProducts), userProducts = _a[0], setUserProducts = _a[1];
    return (_jsx(_Fragment, { children: _jsxs(BrowserRouter, { children: [_jsx(Nav, {}), _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Home, {}) }), _jsx(Route, { path: '/my-pantry', element: _jsx(Pantry, { ingredientsTable: Mock.ingredientsTable, userProducts: userProducts, setUserProducts: setUserProducts }) }), _jsx(Route, { path: '/cook', element: _jsx(Cook, { ingredientsTable: Mock.ingredientsTable, userProducts: userProducts, setUserProducts: setUserProducts, recipes: Mock.recipes }) })] })] }) }));
}
export default App;
