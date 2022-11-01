const AdminSchema = require('../../Model/AdminModel/Admin.model')
const Admin = AdminSchema.Admin_schema
const Otp_schema = require('../../Model/OtpModel/Otp.model')
const OTP = Otp_schema.Otp_schema
const { generateOTP } = require('../../Utils/Services/Otp')
const { sendMail } = require('../../Utils/Services/Mail')
const ResponseCode = require('../../Utils/Responses/ResponseCode')
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




const Admin_ResetPassword= async(req,res)=>{
   
    let Admindata = await Admin.findOne({AdminEmail:req.body.Email})
    const responseType = {}
    const generatedOtp = generateOTP();
    console.log('Generated Otp',generateOTP)
    if(Admindata){
            let otpData = new OTP({
            Email:req.body.Email,
            Code: generatedOtp,
            ExpireIn: new Date().getTime() + 300*1000,
            PersonId: Admindata.id
        })
        console.log("user id ",Admindata.id)
         otpData.save(otpData).
         then( data => {
           
             console.log("OTP data saved successfully")
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while saving the otp"
            });
          });

          try {
            await sendMail({
              to:req.body.Email,
              OTP:generatedOtp,
            });
            res.status(200).send({
                message: 'Please check your email for otp verification'
              });
             
          } catch (error) {
            res.status(500).send({
                message: 'Unable to Send OTP, Please try again later'
              });
     

          }


    }else{
        res.status(500).send({
            message: "Some error occurred while saving the otp"
          });
       

    }

    res.status(200).json(responseType)
}



const Admin_ChangePassword= async (req,res)=>{
  
    const {PersonId,Email,Code,newPass}= req.body
 
    let Otpdata = await OTP.find({PersonId,Email,Code})
    const response={}
     
    if(Otpdata){
       let currentTime = new Date().getTime()
       let diff = Otpdata.expireIn - currentTime
        
       if(diff<0){
        response.message = "Token Expire"
        response.statusText= 'error'

       }else{
        response.message = "Otp receive successfully"
        response.statusText= 'success'
         
        const AdminData = await Admin.findById(PersonId)
        console.log(AdminData)
        

        Admin.findByIdAndUpdate({id:PersonId}, {
            $set:{AdminPass:newPass}
        })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Admin Pass with id=${AdminData.id}. Maybe Admin was not found!`
            });
          } else res.send(
            {
             message1: response.message,
             status: response.statusText,
             message: "Admin pass changes successfully.",
         
         });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Admin Pass with id=" + AdminData.id
          });
        });

        
       }
      
    }else{
            response.message = "Invalid Otp"
            response.statusText = "error"
        res.status(500).send({
             message:response.message,
             status:response.statusText
          });
     
    }


}


const ChangeWithConfirmPass = async (req,res)=>{
    const response={}
    const {id,OldPass,newPass}= req.body
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      let AdminData = await OTP.find({id,UserPass:OldPass})
      console.log(AdminData)
      if(AdminData){
      Admin.findByIdAndUpdate({id:id}, {
        $set:{AdminPass:newPass}
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Admin Pass with id=${AdminData.id}. Maybe Admin was not found!`
        });
      } else res.send(
        {
         message1: response.message,
         status: response.statusText,
         message: "Admin pass changes successfully.",
     
     });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Admin Pass with id=" + AdminData.id
      });
    });
}else{
    res.status(500).send({
        message: "Incorrect Old Password Entered"
      });  
}
    
    
}










module.exports = {
    createAdmin,
    AdminSignIn,
    Admin_ResetPassword,
    Admin_ChangePassword

}

