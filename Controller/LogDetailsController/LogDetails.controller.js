const LogDetailsSchema = require('../../Model/LogDetailsModel/Logs.model')
const Logs = LogDetailsSchema.LogDetails_schema
const ResponseCode = require('../../Utils/Responses/ResponseCode')

const createLogUser = async (req,res)=>{
   
    console.log("create User Call")
   
    const {LogUser_ID,LogUsername,Log_UserPass,Log_UserTable,User_Location} = req.body
    
    const log= new Logs({
        LogUser_ID,LogUsername,Log_UserPass,Log_UserTable,User_Location
    })
    if (!req.body.UserName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

    // save User into database

log.save(log)
  .then(data => {
    res.status(200).send({
      data,
      message:"Log details created Successfully",
      resCode: ResponseCode.ACCOUNT_CREATED_SUCCESSFULLY
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Log details",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
   
   
}


const LogUserSignIn= async (req,res)=>{
    console.log("User SignIn Call")
    const {LogUsername,Log_UserPass}= req.body
   //  Validate request
   if (!req.body.LogUsername) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
      console.log("Log User req body data ",req.body)


       Logs.findOne({
        LogUsername
      })
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ 
              message: err,
              resCode: ResponseCode.ERROR_MESSAGE
            });
            return;
          }
    
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    
          if(user.Log_UserPass== Log_UserPass){
            res.status(200).send({
               user,
                message:"Log User account Login Successfully",
                resCode:ResponseCode.LOGIN_SUCCESSFULL
              
              });
          }else{
            res.status(500).send({
                 
              message:"Incorrect Username and pass",
              resCode: ResponseCode.INCORECT_EMAIL_PASS
            }
               );
          }
          
        });
    }


    const UpdateUserPass = (req,res)=>{
        const {id,newPass} = req.body
        Logs.findOneAndUpdate({LogUser_ID:id},{
            $set:{Log_UserPass:newPass}
        }).then(data=>{
            res.status(200).send({
             
                 message:"Log User Pass Update Successfully",
                 resCode:ResponseCode.PASS_CHANGE_SUCCESSFULLY
               
               });
        }).catch(err=>{
            res.status(500).send({
                 
                message:"Error while Changing Pass",
                resCode: ResponseCode.ERROR_MESSAGE
              }
                 );
          
        })

    }



    const UpdateLogUserProfile = async(req,res)=>{
        const {id, User_Location} = req.body
        Logs.findByIdAndUpdate({LogUser_ID:id},{
            User_Location
        }).then(data=>{
            res.status(200).send({
             
                 message:"Log User data Update Successfully",
                 resCode:ResponseCode.DATA_UPDATE_SUCCESSFULLY
               
               });
        }).catch(err=>{
            res.status(500).send({
                 
                message:"Error while Updating LogDetails data",
                resCode: ResponseCode.ERROR_MESSAGE
              }
                 );
          
        })
    }

module.exports = {
    createLogUser,
    LogUserSignIn,
    UpdateUserPass,
    UpdateLogUserProfile
    
}