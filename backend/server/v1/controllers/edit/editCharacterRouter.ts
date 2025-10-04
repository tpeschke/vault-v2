// @ts-ignore
import express from 'express'
import { editCharacter } from './editCharacterController'

const editCharacterRoutes = express.Router()

editCharacterRoutes.post('/:characterId', editCharacter)

export default editCharacterRoutes