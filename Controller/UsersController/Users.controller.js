const UserSchema = require('../../Model/UserModel/User.model')
const User = UserSchema.User_schema
const Otp_schema = require('../../Model/OtpModel/Otp.model')
const OTP = Otp_schema.Otp_schema
const { generateOTP } = require('../../Utils/Services/Otp')
const { sendMail } = require('../../Utils/Services/Mail')

const createUser = async (req,res)=>{
   
    console.log("create User Call")
   
    const {UserName,UserPass,UserEmail,User_Preferences, Matter_Type} = req.body
    
    const user= new User({
        UserName,
        UserPass,
        UserEmail,
        User_Preferences, 
        Matter_Type
    })

    // save User into database

user.save(user)
  .then(data => {
    res.status(200).send({
      data,
      message:"User account created Successfully",
      resCode: ResponseCode.ACCOUNT_CREATED_SUCCESSFULLY
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User.",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
   
   
}


const UserSignIn= async (req,res)=>{
    console.log("User SignIn Call")
    const {UserName,UserPass}= req.body
   //  Validate request
   if (!UserName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
      console.log("User req body data ",req.body)


       User.findOne({
        UserName:UserName
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
          console.log("here is admin pass ",user.UserPass)

          if(user.UserPass== UserPass){
            res.status(200).send({
               user,
                message:"User account Login Successfully",
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



module.exports = {createUser,UserSignIn}

