// @ts-ignore
import express from 'express'
import addSafehouse from './add/addSafehouse'
import listSafehouses from './list/listSafehouses'
import { deleteSafehouse } from './delete/deleteSafehouse'
import { viewSafehouse } from './view/viewSafehouse'
import { editSafehouse } from './edit/editSafehouse'
import { editSafehouseField } from './edit/editSafehouseField'

const safehouseRoutes = express.Router()

safehouseRoutes.get('/', listSafehouses)
safehouseRoutes.post('/', addSafehouse)
safehouseRoutes.get('/:safehouseID', viewSafehouse)
safehouseRoutes.post('/:safehouseID/field', editSafehouseField)
safehouseRoutes.post('/:safehouseID', editSafehouse)
safehouseRoutes.delete('/:safehouseID', deleteSafehouse)

export default safehouseRoutes
