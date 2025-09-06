// @ts-ignore
import express from 'express'
import { viewUsersCharacters, deleteCharacter, addCharacter } from './HomeController'

const homeRoutes = express.Router()

homeRoutes.get('/allOfUsersCharacter', viewUsersCharacters)

homeRoutes.post('/add', addCharacter)

homeRoutes.delete('/:characterID', deleteCharacter)

export default homeRoutes