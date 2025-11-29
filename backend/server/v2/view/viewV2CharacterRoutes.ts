// @ts-ignore
import express from 'express'
import { getV2Character } from './viewV2CharacterController'

const characterV2Routes = express.Router()

characterV2Routes.get('/:characterID', getV2Character)

export default characterV2Routes