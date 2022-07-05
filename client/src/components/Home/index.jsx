import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pokemon from '../PokemonCard'
import SearchBar from '../SearchBar'
import Paginated from '../Paginado'
import { getPokemons, sortByName, sortByAttack, filterCreated, filterType, getTypes } from '../../redux/actions'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.png'
import styles from './index.css'

export default function Home() {

    const dispatch = useDispatch()
    const { pokemons } = useSelector((state) => state)
    const { types } = useSelector((state) => state)

    const [order, setOrder] = useState('')
    // < Estados y const del pagiando
    const [currentPage, setCurrentPage] = useState(1)
    const [pokesPerPage, setPokesPerPage] = useState(12)

    const indexOfLastPoke = currentPage * pokesPerPage
    const indexOfFirstPoke = indexOfLastPoke - pokesPerPage
    const currentPokemons = pokemons.slice(indexOfFirstPoke, indexOfLastPoke)
    // />

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])
    useEffect(() => {
        dispatch(getTypes())
    }, [])

    function handleNameSort(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
        setOrder(`ordered ${e.target.value}`)
    }
    function handleAttackSort(e) {
        e.preventDefault()
        dispatch(sortByAttack(e.target.value))
        setCurrentPage(1)
        setOrder(`ordered ${e.target.value}`)
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterType(e) {
        dispatch(filterType(e.target.value))
        setCurrentPage(1)
    }

    return (
        <React.Fragment>
            <div className='home'>
                <nav className='navbar'>
                    <div className='btn__container'>
                        <button className='nav__btn'>
                            <Link to='/'>Landing Page</Link>
                        </button>
                        <button className='nav__btn'>
                            <Link to='/create' className='link'>Create Pokemon</Link>
                        </button>
                    </div>
                    <Link to='/home'>
                        <div className="logo">
                            <img src={logo} alt="logo img" />
                        </div>
                    </Link>
                    <SearchBar />
                </nav>

                <div className='filters__container'>
                    <div className='order'>
                        <select onChange={e => handleNameSort(e)}>
                            <option value=''>Order by name:</option>
                            <option value='asc'>A - Z</option>
                            <option value='desc'>Z - A</option>
                        </select>
                    </div>
                    <div className='order'>
                        <select onChange={e => handleAttackSort(e)} id='cleanUpAtk'>
                            <option value=''>Order by attack:</option>
                            <option value="higher">Higher</option>
                            <option value="lower">Lower</option>
                        </select>
                    </div>
                    <div className="filter">
                        <select onChange={e => handleFilterCreated(e)}>
                            <option value="all" >Origin:</option>
                            <option value="created">Created</option>
                            <option value="api">Existent</option>
                        </select>
                    </div>
                    <div className="filter">
                        <select onChange={e => handleFilterType(e)}>
                            <option value='all' >By Type:</option>
                            {types && types.map((t) => {
                                return <option key={t.id} value={t.name}>{t.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                {currentPokemons.length > 0 ?
                    <>
                        <div>
                            <Paginated
                                pokesPerPage={pokesPerPage}
                                pokemons={pokemons.length}
                                paginated={paginated} />
                        </div><div className='container__cards'>
                            {currentPokemons?.map((p) => {
                                return (
                                    <Pokemon
                                        key={p.id}
                                        name={p.name}
                                        image={p.image}
                                        id={p.id}
                                        types={p.types} />
                                )
                            })}
                        </div>
                    </>
                    : <div>
                        <img src="https://i.gifer.com/4OKl.gif" alt="" />
                    </div> 
                }
            </div>
        </React.Fragment>
    )
}
