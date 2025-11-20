// @ts-ignore
import express from 'express'
import { addCharacter } from '../../v1/controllers/home/HomeController'

const characterV2Routes = express.Router()

characterV2Routes.post('/new', addCharacter)

export default characterV2Routes