import { Router } from 'express'
import { body } from "express-validator"

import { handleInputErrors } from './modules/middleware.js'
import {    getOneMeasurement,
            getMeasurements,
            createMeasurement,
            updateMeasurement,
            deleteMeasurement   } from './handlers/measurement.js'

const router = Router()

/** Measurement route */
router.get('/measurement', getMeasurements)    

router.get('/measurement/:id', getOneMeasurement)

router.put('/measurement/:id',
    body('name').isString(), // checks req.body has a field on it called 'name'
    handleInputErrors,
    updateMeasurement
)

router.post('/measurement', 
    body('name').isString(),
    handleInputErrors,
    createMeasurement
)

router.delete('/measurement/:id', deleteMeasurement)


export default router