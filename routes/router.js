const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const router = new express.Router()

// register : http://localhost:3001/register
router.post('/register', userController.registerController)
// register : http://localhost:3001/login
router.post('/login', userController.loginController)
// add-project : http://localhost:3001/add-project
router.post('/add-project', jwtMiddleware, multerMiddleware.single('projectImg'), projectController.addProjectController)
// home-project : http://localhost:3001/home-project
router.get('/home-project', projectController.homePageProjectController)
// all-projects : http://localhost:3001/all-projects
router.get('/all-projects',jwtMiddleware,projectController.allProjectController)
// user-projects : http://localhost:3001/user-projects
router.get('/user-projects',jwtMiddleware,projectController.userProjectController)
// project : http://localhost:3001/project/id/edit
router.put('/projects/:id/edit',jwtMiddleware, multerMiddleware.single('projectImg'),projectController.editProjectController)
// projects/id/remove : http://localhost:3001/projects/id/remove
router.delete('/projects/:id/remove',jwtMiddleware,projectController.removeProjectController)
// edit-user  : http://localhost:3001/edit-user
router.put('/edit-user',jwtMiddleware,multerMiddleware.single('profilepik'),userController.editUserController)



module.exports = router