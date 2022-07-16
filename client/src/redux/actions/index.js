import axios from 'axios'
export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS'
export const GET_POKE_BY_NAME = 'GET_POKE_BY_NAME'
export const GET_TYPES = 'GET_TYPES'
export const POST_POKEMON = 'POST_POKEMON'
export const SORT_BY_NAME = 'SORT_BY_NAME'
export const SORT_BY_ATTACK = 'SORT_BY_ATTACK'
export const FILTER_CREATED = 'FILTER_CREATED'
export const FILTER_TYPE = 'FILTER_TYPE'

export function getPokemons() {
    return async (dispatch) => {
        axios.get('http://localhost:3001/pokemons')
        .then((pokemons) => {
            dispatch({
                type: GET_ALL_POKEMONS,
                payload: pokemons.data,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function getPokeByName(name) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            return dispatch ({
                type: GET_POKE_BY_NAME,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
            alert('There are no pokemons with that name.')
        }
    }
}

export function getTypes() {
   return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/types')
        return dispatch( {
            type: GET_TYPES,
            payload: json.data
        })
    }
}

export function postPokemon (payload) {
    return async function (dispatch)  {
        const json = await axios.post('http://localhost:3001/pokemons', payload)
        console.log(json.data)
        return json;
    }
}

export function sortByName(payload) {
    console.log(payload)
    return {
        type: SORT_BY_NAME,
        payload
    }
}

export function sortByAttack(payload) {
    return {
        type: SORT_BY_ATTACK,
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function filterType(payload) {
    return {
        type: FILTER_TYPE,
        payload
    }
}