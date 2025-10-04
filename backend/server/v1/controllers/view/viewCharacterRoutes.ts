// @ts-ignore
import express from 'express'
import { getCharacter } from './viewCharacterController'

const characterRoutes = express.Router()

characterRoutes.get('/:characterId', getCharacter)

export default characterRoutes