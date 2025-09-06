// @ts-ignore
import express from 'express'
import { viewUsersCharacters, deleteCharacter } from './HomeController'

const homeRoutes = express.Router()

homeRoutes.get('/allOfUsersCharacter', viewUsersCharacters)

homeRoutes.delete('/:characterID', deleteCharacter)

export default homeRoutes