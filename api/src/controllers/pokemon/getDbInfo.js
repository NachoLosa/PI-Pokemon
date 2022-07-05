const {Pokemon, Type} = require('../../db.js')

const getDbInfo = async () => {

    let results = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    
    results = results.map(e => ({...e.dataValues, types: e.types.map(e => e.name)}))
    console.log(results)
    return results;
}

module.exports = getDbInfo;