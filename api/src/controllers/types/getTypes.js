const axios = require('axios')
const { Type } = require('../../db')

const getTypes = async () => {
    const apiTypes = await axios.get('https://pokeapi.co/api/v2/type')
    let types = apiTypes.data.results.map(e => e.name)
    types.forEach(e => {
        Type.findOrCreate({
            where: {name: e}
        })
    });
    const allTypes = await Type.findAll()
    return allTypes
}

module.exports = getTypes;