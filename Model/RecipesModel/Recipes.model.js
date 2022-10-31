const mongoose = require("mongoose");

const RecipesSchema=new mongoose.Schema({
       
      Category_ID:{
        type:String,
        required:true,
       },
     
    
       Recipe_name:{
        type:String,
        required:true,
       },
      
       Recipe_Image:{
        type:String,
        required:true,
       },
     
       Recipe_Video:{
        type:String,
        required:true,
       },
        

     Recipe_Time:{
        type:String,
        required:true,
       },
     
       Recipe_Ingredients:[{
        type:Array,
        default:[]
     }],
     

     Making_Procedure:{
        type:String,
        required:true,
     }




},{

    timestamps:true
}
)

RecipesSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const Recipe_schema = mongoose.model("Recipes", RecipesSchema);
module.exports={ Recipe_schema}

