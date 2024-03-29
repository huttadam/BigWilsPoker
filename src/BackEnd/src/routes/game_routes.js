import express from "express"
import  gameModel  from "../models/gameModel.js"
// import bcrypt from 'bcrypt'
// import {validationResult } from 'express-validator'
// import {newplayerValidate} from "../middleware/validations.js"

const router = express.Router()

router.get('/', async (req, res) => res.send(await gameModel.find()))


router.get('/:id', async (req, res) => {
    const game = await gameModel.findById(req.params.id)
    if (game) {
        res.send(game)
    } else {
        res.status(404).send({ error: 'Game not found' })
    }
})

router.post('/', async (req, res) => {
    try {
        const newGame = await gameModel.create(req.body)
        res.status(201).send(newGame)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedGame = await gameModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedGame) {
            return res.status(404).send({ error: 'Game not found' });
        }
        res.status(200).send(updatedGame);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedGame = await gameModel.findByIdAndDelete(req.params.id)
        if (deletedGame) {
            res.sendStatus(204)
        } 
        else {
            res.status(404).send({ error: 'Game not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})


export default router