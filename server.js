const express = require('express')
const app = express()
const { PORT,MONGODB} = require('./config');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());


var mongoose = require('mongoose')

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  

  const UserRoute = require('./Api/Routes/Users.routes')
  app.use('/UserApi',UserRoute)
 
 


  const AdminRoute = require('./Api/Routes/Admin.routes')
  app.use('/AdminApi',AdminRoute)
 
 
  const RecipeRoute = require('./Api/Routes/Recipes.routes')
  app.use('/RecipeApi',RecipeRoute)
 
 
  const SavedRecipeRoute = require('./Api/Routes/SavedRecipe.routes')
  app.use('/SavedRecipeApi',SavedRecipeRoute)
 



  mongoose.connect(MONGODB, /*We place this to remove warning*/{ useNewUrlParser:
    true, useUnifiedTopology: true }).then(()=>{
    console.log("Connected to MongoDB database")
    }).catch((e)=>{console.log(e.message)})
  
  
  app.listen(PORT, () => {
    console.log(`gd Folder System listening on port ${PORT}`)
  })


