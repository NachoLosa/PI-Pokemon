import {GET_ALL_POKEMONS, GET_POKE_BY_NAME, GET_DETAIL, GET_TYPES, POST_POKEMON, SORT_BY_NAME, SORT_BY_ATTACK, FILTER_CREATED, FILTER_TYPE} from '../actions/'
const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: []
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: payload,
                allPokemons: payload,
                detail: [],
            }

        case GET_POKE_BY_NAME:
            return {
                ...state,
                pokemons: payload,
            }

        case GET_TYPES:
            return {
                ...state,
                types: payload
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: payload
            }

        case POST_POKEMON:
            return {
                ...state,
            }

        case SORT_BY_NAME:
            console.log('soy el payload', payload)
            let sortedName =
                payload === 'asc' 
                    ? state.pokemons.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.pokemons.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1;
                        }
                        if (a.name < b.name) {
                            return 1;
                        }
                        return 0;
                    })
            return {
                ...state,
                pokemons: sortedName
            }

        case SORT_BY_ATTACK:
            let sortedAttack =
                payload === 'higher'
                    ? state.pokemons.sort((a, b) => {
                        return b.attack - a.attack
                    })
                    : state.pokemons.sort((a, b) => {
                        return a.attack - b.attack
                    })
            return {
                ...state,
                pokemons: sortedAttack
            }
        case FILTER_CREATED:
            let createdPokemons = state.allPokemons
            const createdFilter = payload === 'created'
                ? createdPokemons.filter(e => e.createdAtDb)
                : createdPokemons.filter(e => !e.createdAtDb)
            return {
                ...state,
                pokemons: payload === 'all' ? createdPokemons : createdFilter
            }

        case FILTER_TYPE:
            let typePokemons = state.allPokemons
            console.log('Soy payload',payload)
            console.log('soy typePokemon',typePokemons)
            console.log('soy typePokemon[0]',typePokemons[0])
            console.log('soy types de 0',typePokemons[0].types)

            const filteredTypes = payload === 'all' 
            ? typePokemons 
            : typePokemons.filter( poke => poke.types.includes(payload))
                console.log('soy types',typePokemons[0].types)
            
                return {
                    ...state,
                    pokemons: filteredTypes
                }

        default:
            return state
    }
}