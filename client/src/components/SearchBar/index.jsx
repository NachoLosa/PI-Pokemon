import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokeByName } from '../../redux/actions'
import './index.css'

export default function SearchBar () {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
        /*console.log(e.target.value)*/  
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getPokeByName(search))
        setSearch('')
        /* console.log(search) */ 
    }
    return (
       <><div className="searchbar" id="search-bar">
            <input
                type="text"
                className="search__input"
                placeholder="Search Pokémon..."
                onChange={(e) => handleInputChange(e)}/>
            <button
                type="submit"
                className="search__btn"
                onClick={(e) => handleSubmit(e)}>O</button>
        </div></>
    )
}
