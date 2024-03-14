import express from "express"
import  playerModel  from "../models/PlayerModel.js"
// import bcrypt from 'bcrypt'
// import {validationResult } from 'express-validator'
// import {newplayerValidate} from "../middleware/validations.js"

const router = express.Router()

router.get('/', async (req, res) => res.send(await playerModel.find()))


router.get('/:id', async (req, res) => {
    const player = await playerModel.findById(req.params.id)
    if (player) {
        res.send(player)
    } else {
        res.status(404).send({ error: 'Player not found' })
    }
})

router.post('/', async (req, res) => {
    try {
        const newPlayer = await playerModel.create(req.body)
        res.status(201).send({player: newPlayer,message: 'New Player Added' })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedPlayer = await playerModel.findByIdAndDelete(req.params.id)
        if (deletedPlayer) {
            res.sendStatus(204)
        } 
        else {
            res.status(404).send({ error: 'Player not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

export default router