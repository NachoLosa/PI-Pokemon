import React from "react";
import './index.css'

export default function Paginated({   
        pokesPerPage,
        pokemons,
        paginated,
        currentPage,
        setCurrentPage,
    }) {

    const pageNumbers = [];

    let maxPages = Math.ceil(pokemons / pokesPerPage);
    for (let i = 1; i <= maxPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className="pages__container">
            <ul className="pages">
                {currentPage > 1 ?
                    <button
                    onClick={() => setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)}
                    className='prev_next'>{'<'}</button> : <br></br>}
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
                {currentPage < maxPages ?
                <button
                onClick={() => setCurrentPage(currentPage === maxPages ? currentPage : currentPage + 1)}
                className='prev_next'>{'>'}</button> : <br></br>}
            </ul>
        </nav>
    )
}