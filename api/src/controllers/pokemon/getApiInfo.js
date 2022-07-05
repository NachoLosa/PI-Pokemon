const axios = require('axios')

const getApiInfo = async () => {
    
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
    const apiInfo = await apiUrl.data.results
    
    const imgR1 = 'sprites'
    const imgR2 = 'other'
    const imgR3 = 'official-artwork'
    let pokemon = await Promise.all(
    
        apiInfo.map(async (e) => {
            if (e.url) {
                const pokemonInfo = await axios.get(e.url)
                const thisPokemon = await pokemonInfo.data
                return {
                    id: thisPokemon.id,
                    name: thisPokemon.name,
                    hp: thisPokemon.stats[0].base_stat,
                    attack: thisPokemon.stats[1].base_stat,
                    defense: thisPokemon.stats[2].base_stat,
                    speed: thisPokemon.stats[5].base_stat,
                    height: thisPokemon.height,
                    weight: thisPokemon.weight,
                    image: thisPokemon[imgR1][imgR2][imgR3].front_default,
                    types: thisPokemon.types.map(e => e.type.name),
                }
            }
        })
    ) 
    return pokemon
}

module.exports = getApiInfo;