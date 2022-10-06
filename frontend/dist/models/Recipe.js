var Recipe = /** @class */ (function () {
    function Recipe(id, name, products) {
        this.id = id;
        this.name = name;
        this.products = products;
    }
    Recipe.prototype.getProducts = function () {
        return this.products;
    };
    Recipe.prototype.getProductsIds = function () {
        var newResult = this.products.map(function (product) {
            return product.id;
        });
        return newResult;
    };
    return Recipe;
}());
export { Recipe };
