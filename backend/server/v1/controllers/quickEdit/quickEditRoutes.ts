// @ts-ignore
import express from 'express'
import { quickEditCharacter } from './quickEditController'

const quickEditRoutes = express.Router()

quickEditRoutes.post('', quickEditCharacter)

export default quickEditRoutes