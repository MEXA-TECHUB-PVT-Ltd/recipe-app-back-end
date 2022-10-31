const express= require('express')
const app= express()

const AdminController = require('../../Controller/AdminController/Admin.controller')
app.get('/CreateAdmin',AdminController.createAdmin)
app.post('/LoginAdmin',AdminController.AdminSignIn)
// app.post('/AdminChangePass',SuperAdminController.Admin_ChangePassword)
// app.post('/AdminResetPass',SuperAdminController.Admin_ResetPassword)
// app.post('/UpdateAdminData',SuperAdminController.UpdateAdminProfile)
// app.post('/LogoutAdmin',SuperAdminController.LogOutAdmin)
// app.post('/viewAdminProfile',SuperAdminController.ViewProfileData)
module.exports= app