// @ts-ignore
import express from 'express'
import addV2Character from './addV2CharacterController'

const addV2Routes = express.Router()

addV2Routes.post('/add', addV2Character)

export default addV2Routes