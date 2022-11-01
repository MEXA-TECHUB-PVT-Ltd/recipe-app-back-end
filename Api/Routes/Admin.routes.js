const express= require('express')
const app= express()

const AdminController = require('../../Controller/AdminController/Admin.controller')
app.post('/CreateAdmin',AdminController.createAdmin)
app.post('/LoginAdmin',AdminController.AdminSignIn)
app.post('/AdminChangePass',AdminController.Admin_ChangePassword)
app.post('/AdminResetPass',AdminController.Admin_ResetPassword)
app.post('/ChangeWithConfirmPass',AdminController.Admin_ChangePassword)

 module.exports= app