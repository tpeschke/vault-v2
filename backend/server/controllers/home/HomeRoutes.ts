// @ts-ignore
import express from 'express'
import { viewUsersCharacters } from './HomeController'
import deleteCharacter from './v1/deleteCharacter'

const homeRoutes = express.Router()

homeRoutes.get('/allOfUsersCharacter', viewUsersCharacters)

homeRoutes.delete('/:characterID', deleteCharacter)

export default homeRoutes