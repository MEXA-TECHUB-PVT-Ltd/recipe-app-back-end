const AdminSchema = require('../../Model/AdminModel/Admin.model')
const Admin = AdminSchema.Admin_schema
const Otp_schema = require('../../Model/OtpModel/Otp.model')
const OTP = Otp_schema.Otp_schema
const { generateOTP } = require('../../Utils/Services/Otp')
const { sendMail } = require('../../Utils/Services/Mail')

const createAdmin = async (req,res)=>{
   
    console.log("create User Call")
   
    const {AdminEmail,AdminPass,AdminUsernamel,AdminProfileImage,AdminDisplayName} = req.body
    
    const admin= new Admin({
        AdminEmail,
        AdminPass,
        AdminUsernamel,
        AdminProfileImage,
        AdminDisplayName
    })

    // save User into database

admin.save(admin)
  .then(data => {
    res.status(200).send({
      data,
      message:"Admin account created Successfully",
      resCode: ResponseCode.ACCOUNT_CREATED_SUCCESSFULLY
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Admin.",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
   
   
}


const AdminSignIn= async (req,res)=>{
    console.log("Admin SignIn Call")
    const {AdminUsername,AdminPass}= req.body
   //  Validate request
   if (!AdminUsername) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
      console.log("Admin req body data ",req.body)


       Admin.findOne({
        AdminUsername:AdminUsername
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
          console.log("here is admin pass ",Admin)

          if(user.AdminPass== AdminPass){
            res.status(200).send({
               user,
                message:"Admin account Login Successfully",
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



module.exports = {createAdmin,AdminSignIn}

