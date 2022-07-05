const { Router } = require('express');
const { Type } = require('../db')
const axios = require('axios')
const getTypes = require('../controllers/types/getTypes')


const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let showTypes = await getTypes();
        res.status(200).json(showTypes)
    } catch (error) {
        res.status(400).json(next(error))
    }
})


module.exports = router;
