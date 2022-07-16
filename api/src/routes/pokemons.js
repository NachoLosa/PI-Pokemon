const { Router } = require('express');
const { Pokemon, Type } = require('../db.js')
const router = Router();
const getAllPokemon = require('.././controllers/pokemon/getAllInfo');



router.get('/', async (req, res) => {
    let { name } = req.query;
    let allPokemons = await getAllPokemon()
    try {
        if (name) {
            let pokeName = await allPokemons.filter(e => e.name.toLowerCase() === name.toLowerCase())
            pokeName.length ?
                res.status(200).json(pokeName) :
                res.status(404).json({ msg: `That pokemon doesn't exist` })
        } else {
            res.status(200).json(allPokemons)
        }

    } catch (error) {
        res.status(404).json({ error: error.message })
    }

})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    let allPokemons = await getAllPokemon()
    try {
        if (id) {
            let pokemonId = allPokemons.filter(e => e.id == id)
            pokemonId.length ?
                res.status(200).json(pokemonId) :
                res.status(404).send('There is no pokemon with that id')
        }
    } catch (error) {
        res.status(400).json(next(error))
    }
})


router.post('/', async (req, res) => {
    let {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        type,
        createdAtDb,
    } = req.body;

    try {
        if (name && typeof name === 'string') {
            if (
                hp > 0 && hp <= 255,
                attack > 0 && attack <= 255,
                defense > 0 && defense <= 255,
                speed > 0 && speed <= 255,
                height > 0 && height <= 1000,
                weight > 0 && weight <= 10000
            ) {
                let pokemonCreated = await Pokemon.create({
                    name: name.toLowerCase(),
                    hp,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                    image,
                    createdAtDb
                })
                let pokemonTypes = await Type.findAll({ where: { name: type } })
                pokemonCreated.addType(pokemonTypes);
                res.status(201).send('The Pokémon was been successfully created')
            } else {
                res.status(400).send('Stat values ​​must be between 0 and 255')
            }
        } else {
            res.status(400).send('Name is required')
        }

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

module.exports = router;
