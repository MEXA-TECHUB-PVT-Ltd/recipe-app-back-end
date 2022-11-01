const express= require('express')
const app= express()

const RecipeController = require('../../Controller/SavedRecipeController/SavedRecipe.controller')
app.post('/SaveRecipe',RecipeController.SaveRecipe)
app.post('/ViewAllSavedRecipe',RecipeController.ViewAllSavedRecipe)

module.exports= app