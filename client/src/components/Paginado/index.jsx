import React from "react";
import './index.css'

export default function Paginated(
    { pokesPerPage,
        pokemons,
        paginated,
    }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(pokemons / pokesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className="pages__container">
            <ul className="pages">
                {pageNumbers && pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            className="number"
                            onClick={() => paginated(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}