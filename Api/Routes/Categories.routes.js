const express= require('express')
const app= express()

const CategoriesController = require('../../Controller/CategoriesController/Categories.controller')
app.post('/CreateCategory',RecipeController.CreateRecipe)
app.post('/UpdateCategory',RecipeController.UpdateRecipe)
app.post('/DeleteCategory',RecipeController.DeleteRecipe)
app.post('/ViewAllCategories',RecipeController.ViewAllRecipe)
app.post('/ViewCategory',RecipeController.ViewRecipe)
module.exports= app