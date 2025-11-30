// @ts-ignore
import express from 'express'
import { deleteV2Character } from './deleteV2CharacterController'

const deleteV2Routes = express.Router()

deleteV2Routes.delete('/:characterID', deleteV2Character)

export default deleteV2Routes