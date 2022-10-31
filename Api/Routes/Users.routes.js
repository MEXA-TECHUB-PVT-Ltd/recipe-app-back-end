const express= require('express')
const app= express()

const UserController = require('../../Controller/UsersController/Users.controller')
app.post('/CreateUser',UserController.createUser)
app.post('/LoginUser',UserController.UserSignIn)
app.post('/UserChangePass',UserController.User_ChangePassword)
 app.post('/UserResetPass',UserController.User_ResetPassword)
// app.post('/UpdateAdminData',SuperAdminController.UpdateAdminProfile)
// app.post('/LogoutAdmin',SuperAdminController.LogOutAdmin)
// app.post('/viewAdminProfile',SuperAdminController.ViewProfileData)
module.exports= app