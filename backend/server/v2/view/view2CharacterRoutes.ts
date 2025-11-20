// @ts-ignore
import express from 'express'
import { getV2Character } from './view2CharacterController'

const characterV2Routes = express.Router()

characterV2Routes.get('/:characterId', getV2Character)

export default characterV2Routes