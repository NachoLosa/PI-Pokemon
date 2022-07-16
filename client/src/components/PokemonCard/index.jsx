import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
export default function Pokemon({ name, image, id, types }) {
    /* console.log(name, id, types) */
    const defaultImg = 'https://w7.pngwing.com/pngs/248/960/png-transparent-pikachu-pokemon-go-silhouette-drawing-pikachu-dog-like-mammal-fictional-character-black.png'
    return (
        <div className='Card'>
            <Link to={`/detail/${id}`}>
            <h3 className='name'>{name}</h3>
            {image?<img src={image} alt="Pic of pokemon" />
            :<img src={defaultImg} alt='Pic of pokemon'></img>}
            <div className="typesDiv">     
            { types.map(e => (
                <h4 key={e} className={e}>{e}</h4>
                ))}
                </div>
            </Link>
        </div>
    )
}