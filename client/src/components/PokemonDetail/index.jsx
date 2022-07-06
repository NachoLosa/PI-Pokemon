import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect, useState } from "react";
import axios from 'axios'
import styles from './index.css'
import typesImage from "./typeImgs";

export default function PokemonDetail() {
    /* const dispatch = useDispatch()
    const { id } = useParams()
    console.log(id)
    let myPokemon = useSelector((state) => state.detail)
    console.log(myPokemon)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id]) */

    const { id } = useParams()
    const [myPokemon, setPokemon] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3001/pokemons/${id}`)
            .then((response) => {
                setPokemon(response.data)
            })

        return () => {
            setPokemon(null)
        }
    }, [])
    return (
        <div className="detail">
            <div className="detail-btn">
                <Link to='/home'>
                    <button >Home</button>
                </Link>
            </div>
            {myPokemon ?
                <div className='card__container'>
                    <div className={myPokemon[0].types[0]}>
                        <div className='image__container'>
                            <img src={myPokemon[0].image} alt="fotico" />
                        </div>
                        <span className="types__img">
                            <img src={typesImage[myPokemon[0].types[0]]} alt="mainTypeImg" className="mainTypeImg" />
                            {typesImage[myPokemon[0].types[1]] ? <img src={typesImage[myPokemon[0].types[1]]} alt="subTypeImg" className="subTypeImg" /> : <></>}
                        </span>
                        <h2 className="card__name">{myPokemon[0].name}</h2>
                        <table className="stats__container"><tbody>
                            <tr>
                                <th>Health Points:</th>
                                <td>{myPokemon[0].hp}</td>
                            </tr>
                            <tr>
                                <th>Attack Points:</th>
                                <td>{myPokemon[0].attack}</td>
                            </tr>
                            <tr>
                                <th>Defense Points:</th>
                                <td>{myPokemon[0].defense}</td>
                            </tr>
                            <tr>
                                <th>Speed Points:</th>
                                <td>{myPokemon[0].speed}</td>
                            </tr>
                            <tr>
                                <th>Height:</th>
                                <td>{myPokemon[0].height}</td>
                            </tr>
                            <tr>
                                <th>Weight:</th>
                                <td>{myPokemon[0].weight}</td>
                            </tr>
                        </tbody></table>
                        {/* <span className="types__img">
                            <img src={typesImage[myPokemon[0].types[0]]} alt="mainTypeImg" className="mainTypeImg" />
                            {typesImage[myPokemon[0].types[1]] ? <img src={typesImage[myPokemon[0].types[1]]} alt="subTypeImg" className="subTypeImg" /> : <></>}
                        </span> */}
                    </div>
                </div>
                : <div className="loading">
                    <img src="https://i.gifer.com/4OKl.gif" alt="" />
                </div>
            }
        </div>
    )
}