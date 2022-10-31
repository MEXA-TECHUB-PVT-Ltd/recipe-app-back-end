const RecipeSchema = require('../../Model/RecipesModel/Recipes.model')
const Recipe = RecipeSchema.Recipe_schema

const CreateRecipe = (req,res)=>{
      
    const {
        Category_ID,
        Recipe_name,
        Recipe_Image,
        Recipe_Video, 
        Recipe_Time,
        IngredientList,
        Making_Procedure} = req.body
    
        if (!req.body.Recipe_name) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }


    const recipe= new Recipe({
        Category_ID,
        Recipe_name,
        Recipe_Image,
        Recipe_Video, 
        Recipe_Time,
        IngredientList,
        Making_Procedure
    })

    // save User into database

recipe.save(recipe)
  .then(data => {
   console.log("data of recipe before adding Ingredients ",data)
    Recipe.findOneAndUpdate(
        { id: data.id },
        {$push : { Recipe_Ingredients:   IngredientList }}
    ).then(data=>{
        console.log("data of recipe after adding Ingredients ",data)
      res.status(200).send({
      data,
      message:"recipe created Successfully",
      resCode: ResponseCode.ACCOUNT_CREATED_SUCCESSFULLY
    });

    }).catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating Recipe Ingredients"
          });
    })



  
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Recipe.",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
   
}


const DeleteRecipe =(req,res)=>{
    const {id} = req.body;
    console.log(id)
     
    if (!req.body.id) {
        res.status(400).send({ message: "Recipe Id required to delete data" });
        return;
      }


    Recipe.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
          });
        } else {
          res.send({
            message: "Recipe deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Recipe with id=" + id
        });
      });
}


const UpdateRecipe = (req,res)=>{
    const {
        id,
        Recipe_name,
        Recipe_Image,
        Recipe_Video, 
        Recipe_Time,
        IngredientList,
        Making_Procedure}  = req.body

        if(!req.body){
            res.status(400).send({ message: "No Data Found To Update" });
            return;
        }

        Recipe.findByIdAndUpdate({id:id}, {
            Recipe_name,
            Recipe_Image,
            Recipe_Video,
            Recipe_Time,
            Making_Procedure,
            $set : {   Recipe_Ingredients :  IngredientList }
        }).then(data=>{
      res.status(200).send({
        message:" Recipe updated successfully",

      });
           
    }).catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating Recipe"
          });
    })
}


const ViewAllRecipe =async (req,res)=>{
   
    const Data =  await Recipe.find();
  console.log(Data)
  res.status(200).send(
    {
        Data,
        message:"Recipe data found successfully"
    }
     ) 
}


const ViewRecipe =async (req,res)=>{
    const {id} = req.body
    const Data = await Recipe.findById(id)
    if(Data){
    res.status(200).send({
      Data,
      message:"Recipe Found Successfully"
    });
  }else{
    res.status(500).send({
      message:"Error Finding Recipe"
    });
  }
}


module.exports = {
    CreateRecipe,
    DeleteRecipe,
    UpdateRecipe,
    ViewAllRecipe,
    ViewRecipe
}