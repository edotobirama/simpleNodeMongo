import UserModel from '../model/userModel.js'

import { createFactory,getElementById,getAllFactory,deleteElementById } from '../utilities/crudFactory.js'

export const createUserHandler=createFactory(UserModel,"User")
export const getUserById = getElementById(UserModel,"User")
export const deleteUserById =deleteElementById(UserModel,"User")
export const getAllUsers = getAllFactory(UserModel,"User")
