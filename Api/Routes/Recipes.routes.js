const express= require('express')
const app= express()

const RecipeController = require('../../Controller/RecipesController/Recipes.controller')
app.post('/CreateRecipe',RecipeController.CreateRecipe)
app.post('/UpdateRecipe',RecipeController.UpdateRecipe)
app.post('/DeleteRecipe',RecipeController.DeleteRecipe)
app.post('/ViewAllRecipe',RecipeController.ViewAllRecipe)
app.post('/ViewRecipe',RecipeController.ViewRecipe)
module.exports= app