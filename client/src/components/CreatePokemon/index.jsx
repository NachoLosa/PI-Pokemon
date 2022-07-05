import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.css'

function validate(input) {
    let errors = {}

    if (!input.name) {
        errors.name = 'The name is required for the creation of the pokemon'
    }
    if (!input.image) {
        errors.image = 'Please enter an image of your pokemon'
    }
    if (input.hp < 0 || input.hp > 255) {
        errors.stats = 'Stat values ​​must be between 0 and 255'
    }
    if (input.attack < 0 || input.attack > 255) {
        errors.stats = 'Stat values ​​must be between 0 and 255'
    }
    if (input.defense < 0 || input.defense > 255) {
        errors.stats = 'Stat values ​​must be between 0 and 255'
    }
    if (input.speed < 0 || input.speed > 255) {
        errors.stats = 'Stat values ​​must be between 0 and 255'
    }
    if (input.height < 0 || input.height > 255) {
        errors.height = 'Stat values ​​must be between 0 and 1.000'
    }
    if (input.weight < 0 || input.weight > 255) {
        errors.weight = 'Stat values ​​must be between 0 and 10.000'
    }
    /* if ( types[0] === types[1] ) {
        errors.type = 'Two same types cannot be selected, please change the "Subtype" or select "None"'
    } */

    return errors
}

export default function PokemonCreate() {

    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)

    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
    })

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.value]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postPokemon(input))
        alert('Congratulations! the Pokémon was created successfully')
        /* console.log(input) */
        setInput({
            name: '',
            image: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            types: [],
        })
    }
    return (
        <div className="fullpage">
            <Link to='/home'><button className="home__btn">Home</button></Link>
            <div className="form__div">
                <h1>Create your Pokémon</h1>
                <form onSubmit={e => handleSubmit(e)} className='form__container'>
                    <div className="formPart">
                        <div className="formPart__int">
                            <label>Name: </label>
                            <input
                                type="text"
                                name='name'
                                value={input.name}
                                placeholder='3-15 characters'
                                onChange={e => handleChange(e)}
                            />
                        </div>

                    </div>
                    <div className="formPart">
                        <div className="formPart__int">
                            <label>Health Points:</label>
                            <input
                                type="text"
                                name='hp'
                                value={input.hp}
                                placeholder='from 0 to 255'
                                onChange={e => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="formPart">
                        <div className="formPart__int">
                            <label>Attack Points:</label>
                            <input
                                type="text"
                                name='attack'
                                value={input.attack}
                                placeholder='from 0 to 255'
                                onChange={e => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="formPart">
                        <div className="formPart__int">
                            <label>Defense Points:</label>
                            <input
                                type="text"
                                name='defense'
                                value={input.defense}
                                placeholder='from 0 to 255'
                                onChange={e => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="formPart">
                        <div className="formPart__int">
                            <label>Speed Points:</label>
                            <input
                                type="text"
                                name='speed'
                                value={input.speed}
                                placeholder='from 0 to 255'
                                onChange={e => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="formPart">
                        <div className="formPart__int">
                            <label>Height:</label>
                            <input
                                type="text"
                                name='height'
                                value={input.height}
                                placeholder='Defined in decimeters...'
                                onChange={e => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="formPart">
                        <div className="formPart__int">
                            <label>Weight:</label>
                            <input
                                type="text"
                                name='weight'
                                value={input.weight}
                                placeholder='Defined in hectograms...'
                                onChange={e => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="formPart">
                        <div className="formPart__int">
                            <label>Image: </label>
                            <input
                                type="text"
                                name='image'
                                value={input.image}
                                placeholder='image url'
                                onChange={e => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className="type__part">
                        <div>
                            <h4>Main type</h4>
                            <select>
                                {types.map((t) =>
                                    <option value={input.types} key={t.name}>{t.name}</option>
                                )}
                            </select>
                        </div>
                        {/* <div>
                            <h4>Sub type</h4>
                            <select>
                                <option value="">None</option>
                                {types.map((t) =>
                                    <option value={input.types} key={t.name}>{t.name}</option>
                                )}
                            </select>
                        </div> */}
                    </div>
                    <div>
                        <div>
                            {errors.name && (
                                <p className="error">{errors.name}</p>
                            )}
                            {errors.image && (
                                <p className="error">{errors.image}</p>
                            )}
                            {errors.stats && (
                                <p className="error">{errors.stats}</p>
                            )}
                            {errors.height && (
                                <p className="error">{errors.height}</p>
                            )}
                            {errors.weight && (
                                <p className="error">{errors.weight}</p>
                            )}
                        </div>
                        <button type="submit">Create</button>
                    </div>
                </form >
            </div >
        </div>
    )
}
