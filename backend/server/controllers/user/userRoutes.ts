// @ts-ignore
import express from 'express'
import { checkIfLoggedIn } from './userController'

const userRoutes = express.Router()

userRoutes.get('/isLoggedIn', checkIfLoggedIn)

export default userRoutes