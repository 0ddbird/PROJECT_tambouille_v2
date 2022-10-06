import { Ingredient } from '../models/Ingredient';
var categories = [
    {
        id: 0,
        name: 'fruit'
    },
    {
        id: 1,
        name: 'vegetable'
    },
    {
        id: 2,
        name: 'meat'
    },
    {
        id: 3,
        name: 'fish'
    },
    {
        id: 4,
        name: 'dry food'
    },
    {
        id: 5,
        name: 'dairy products'
    },
    {
        id: 6,
        name: 'liquids'
    }
];
// Cat 0 : FRUITS
var pastry = new Ingredient(0, 'pastry', 4, 'g');
var apple = new Ingredient(1, 'apple', 0, 'unit');
var sugar = new Ingredient(2, 'sugar', 4, 'g');
var salt = new Ingredient(3, 'salt', 4, 'g');
var flour = new Ingredient(4, 'flour', 4, 'g');
var water = new Ingredient(5, 'water', 6, 'mL');
var pasta = new Ingredient(6, 'pasta', 4, 'g');
var mushroom = new Ingredient(7, 'mushroom', 1, 'g');
var butter = new Ingredient(8, 'butter', 5, 'g');
var pineapple = new Ingredient(9, 'pineapple', 0, 'unit');
var egg = new Ingredient(10, 'egg', 5, 'unit');
var chocolate = new Ingredient(11, 'chocolate', 4, 'unit');
var chicken = new Ingredient(12, 'chicken', 2, 'g');
var tuna = new Ingredient(13, 'tuna', 3, 'g');
var rice = new Ingredient(14, 'rice', 4, 'g');
var ingredientsTable = [pastry, apple, sugar, salt, flour, water, pasta, mushroom, butter, pineapple, egg, chocolate, chicken, tuna, rice];
export { ingredientsTable, categories };
