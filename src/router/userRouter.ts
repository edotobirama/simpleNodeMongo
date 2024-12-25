import Router from 'express'
import {checkInput} from '../utilities/crudFactory.js'
const UserRouter = Router()
import {createUserHandler,getUserById ,deleteUserById,getAllUsers} from '../controller/userController.js'
UserRouter.get('/', getAllUsers)

UserRouter.get('/:userId', getUserById)

UserRouter.delete('/:userId', deleteUserById)

UserRouter.post('/', checkInput, createUserHandler)

export default UserRouter