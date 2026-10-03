// @ts-ignore
import express from 'express'
import { editV2Character } from './editV2CharacterController'
import { editV2Field } from './editV2FieldController'

const editV2Routes = express.Router()

editV2Routes.post('/:characterID/field', editV2Field)
editV2Routes.post('/:characterID', editV2Character)

export default editV2Routes
