import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pokemon from "../PokemonCard";
import SearchBar from "../SearchBar";
import Paginated from "../Paginado";
import Loading from "../Loading";
import {
  getPokemons,
  sortByName,
  sortByAttack,
  filterCreated,
  filterType,
  getTypes,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import "./index.css";

export default function Home() {
  const dispatch = useDispatch();
  const { pokemons } = useSelector((state) => state);
  const { types } = useSelector((state) => state);

  const [order, setOrder] = useState("");
  // < Estados y const del pagiando
  const [currentPage, setCurrentPage] = useState(1);
  const [pokesPerPage, setPokesPerPage] = useState(12);

  const indexOfLastPoke = currentPage * pokesPerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPoke, indexOfLastPoke);
  // />

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function handleNameSort(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrder(`ordered ${e.target.value}`);
    /* console.log('soy order',setOrder) */
  }
  function handleAttackSort(e) {
    e.preventDefault();
    dispatch(sortByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(`ordered ${e.target.value}`);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterType(e.target.value));
    setCurrentPage(1);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
    setCurrentPage(1);
  }
  const feedbackLink =
    "https://docs.google.com/forms/d/1Oj34YAXwlz-loOViBQ0O_qcte3eOgC36ShcwlV2phSU/edit";
  return (
    <React.Fragment>
      <div className="home">
        <nav className="navbar">
          <div className="btn__container">
            <button className="nav__btn">
              <Link to="/">Landing Page</Link>
            </button>
            <button className="nav__btn">
              <Link to="/create" className="link">
                Create Pokemon
              </Link>
            </button>
          </div>
          <Link to="/home">
            <div className="logo">
              <img src={logo} alt="logo img" />
            </div>
          </Link>
          <SearchBar />
        </nav>
        <a href={feedbackLink} target="__blank">
          <button className="feedback__btn">Feedback</button>
        </a>

        <div className="filters__container">
          <div className="order">
            <select onChange={(e) => handleNameSort(e)}>
              <option value="">Order by name:</option>
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </div>
          <div className="order">
            <select onChange={(e) => handleAttackSort(e)} id="cleanUpAtk">
              <option value="">Order by attack:</option>
              <option value="higher">Higher</option>
              <option value="lower">Lower</option>
            </select>
          </div>
          <div className="filter">
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="all">Origin:</option>
              <option value="created">Created</option>
              <option value="api">Existent</option>
            </select>
          </div>
          <div className="filter">
            <select onChange={(e) => handleFilterType(e)}>
              <option value="all">By Type:</option>
              {types &&
                types.map((t) => {
                  return (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="refresh" onClick={(e) => handleClick(e)}>
            <p>Refresh Pokemóns</p>
          </div>
        </div>
        {currentPokemons.length > 0 ? (
          <>
            <div>
              <Paginated
                pokesPerPage={pokesPerPage}
                pokemons={pokemons.length}
                paginated={paginated}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
            <div className="container__cards">
              {currentPokemons?.map((p) => {
                return (
                  <Pokemon
                    key={p.id}
                    name={p.name}
                    image={p.image}
                    id={p.id}
                    types={p.types}
                  />
                );
              })}
            </div>
            <div>
              <Paginated
                pokesPerPage={pokesPerPage}
                pokemons={pokemons.length}
                paginated={paginated}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </React.Fragment>
  );
}
