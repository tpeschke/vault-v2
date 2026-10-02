// @ts-ignore
import express from 'express'
import { editV2Character } from './editV2CharacterController'

const editV2Routes = express.Router()

editV2Routes.post('/:characterID', editV2Character)

export default editV2Routes
