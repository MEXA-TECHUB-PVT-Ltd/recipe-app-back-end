const express= require('express')
const app= express()

const UserController = require('../../Controller/UsersController/Users.controller')
app.post('/CreateUser',UserController.createUser)
app.post('/LoginUser',UserController.UserSignIn)
app.post('/UserChangePass',UserController.User_ChangePassword)
 app.post('/UserResetPass',UserController.User_ResetPassword)
app.post('/ChangeWithConfirmPass',UserController.ChangeWithConfirmPass)
module.exports= app