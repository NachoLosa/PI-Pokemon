import React from "react";
import './index.css'

export default function Paginated(
    { pokesPerPage,
        pokemons,
        paginated,
        /* currentPage,
        setCurrentPage, */
    }) {
        
        const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(pokemons / pokesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className="pages__container">
            <ul className="pages">
                {/*<a onClick={() =>
                setCurrentPage(currentPage === 1 ? currentPage 
                : currentPage - 1)} className='number'>{'<'}</a> */}
                { pageNumbers && pageNumbers.map(number => (
                    <li className="number" key={number}>
                    <a onClick={() => paginated(number)}>{number}</a>
                    </li>
                ))}
                {/* <button onClick={() =>
                setCurrentPage(currentPage + 1)}
                className='number'>{'>'}</button> */}
            </ul>
        </nav>
    )
}