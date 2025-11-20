// @ts-ignore
import express from 'express'
import addV2Character from './addV2CharacterController'

const characterV2Routes = express.Router()

characterV2Routes.post('/new', addV2Character)

export default characterV2Routes