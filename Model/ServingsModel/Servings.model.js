const mongoose = require("mongoose");

const ServingSchema=new mongoose.Schema({

    
       Recipe_id:{
        type:String,
        required:true,
       },

       Serving_Quantity:{
        type:String,
        required:true,
       },

        Serving_Name:{
        type:String,
        required:true,
       },


},{

    timestamps:true
}
)

ServingSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const Servings_schema = mongoose.model("Servings", ServingSchema);
module.exports={ Servings_schema}

