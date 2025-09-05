// @ts-ignore
import express from 'express'
import { viewUsersCharacters } from './HomeController'

const homeRoutes = express.Router()

homeRoutes.get('/allOfUsersCharacter', viewUsersCharacters)

export default homeRoutes