const RecipeSchema = require('../../Model/SavedRecipeModel/SavedRecipe.model')
const Recipe = RecipeSchema.SavedRecipe_schema
const ResponseCode = require('../../Utils/Responses/ResponseCode')

const SaveRecipe = (req,res)=>{
      
    const {
       Recipe_ID} = req.body
    
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }


    const recipe= new Recipe({
        Recipe_ID
    })

    // save User into database

recipe.save(recipe)
  .then(data => {
    res.status(200).send({
        message:"Recipe saved Successfully",
        resCode:ResponseCode.DATA_ADDED_SUCCESSFULLY
      });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Recipe.",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
   
}


const ViewAllSavedRecipe = async (req,res)=>{
    const Data =  await Recipe.find();
    console.log(Data)
    res.status(200).send(
      {
          Data,
          message:"Recipe data found successfully"
      }
       ) 
}

module.exports={SaveRecipe,ViewAllSavedRecipe}