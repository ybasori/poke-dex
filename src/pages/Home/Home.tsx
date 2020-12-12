import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Modal from "../../components/Modal";
import {
  getPokemon,
  setComparePokemon,
  setPokemonDetail,
} from "../../_redux/pokemon";
import { Reducers } from "../../_redux/types";
import "./style.scss";

const Home = () => {
  const pokemonState = useSelector((state: Reducers) => state.pokemon);
  const dispatch = useDispatch();
  const listDataRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const [showFilter, setShowFilter] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  // const [offset, setOffset] = useState(0);
  // const [limit] = useState(10);
  const [pokeTypes, setPokeTypes] = useState<any>([]);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<any>([]);

  const fetchDataPokemon = useCallback(
    (offset: number) => {
      setIsFetching(true);
      dispatch(getPokemon({ offset, limit: 10 }));
    },
    [dispatch]
  );

  const onLoadMore = () => {
    fetchDataPokemon(
      pokemonState.successGetPokemon.offset +
        pokemonState.successGetPokemon.limit
    );
    setTimeout(() => {
      if (listDataRef.current) {
        listDataRef.current.scrollTop =
          pokemonState.successGetPokemon.results.length * 500;
      }
    }, 10);
  };

  const onPokemon = (pokemon: string) => {
    if (pokemonState.compare.length === 0) {
      dispatch(
        setPokemonDetail(
          pokemonState.successGetPokemon.results.find(
            (item: { name: string }) => item.name === pokemon
          )
        )
      );
      history.push(`/pokemon/${pokemon}`);
    } else {
      dispatch(
        setComparePokemon([
          ...pokemonState.compare,
          pokemonState.successGetPokemon.results.find(
            (item: { name: string }) => item.name === pokemon
          ),
        ])
      );
      history.push(`/compare-pokemon`);
    }
  };

  const onSelectTypeFilter = (value: string) => {
    if (selectedTypeFilter.indexOf(value) >= 0) {
      setSelectedTypeFilter([
        ...selectedTypeFilter.filter((item: string) => item !== value),
      ]);
    } else {
      setSelectedTypeFilter([...selectedTypeFilter, value]);
    }
  };

  useEffect(() => {
    if (!pokemonState.successGetPokemon) {
      fetchDataPokemon(0);
    } else {
      const typeses = pokemonState.successGetPokemon.results.map(
        (item: { types: any[] }) =>
          item.types.map((type: { type: { name: string } }) => type.type.name)
      );
      let types: any = [];
      for (let i = 0; i < typeses.length; i++) {
        for (let j = 0; j < typeses[i].length; j++) {
          if (types.indexOf(typeses[i][j]) < 0) {
            types = [...types, typeses[i][j]];
          }
        }
      }
      setPokeTypes(types);
    }
  }, [fetchDataPokemon, pokemonState.successGetPokemon]);

  useEffect(() => {
    if (isFetching && pokemonState.successGetPokemon) {
      setIsFetching(false);
    }
  }, [isFetching, pokemonState.successGetPokemon]);
  return (
    <div id="home">
      {pokemonState.compare.length > 0 && (
        <div className="compare-pokemon-name">
          <div style={{ fontSize: 10 }}>Compare: </div>
          {pokemonState.compare.map(
            (pokemon: { name: string }, key: number) => (
              <div className="pokemon-name" key={key}>
                {pokemon.name}
              </div>
            )
          )}
        </div>
      )}
      <div className="list-data" ref={listDataRef}>
        {!isFetching &&
          pokemonState.successGetPokemon &&
          pokemonState.successGetPokemon.results
            .filter((item: { types: { type: { name: string } }[] }) => {
              if (selectedTypeFilter.length === 0) {
                return true;
              } else {
                const types = item.types.map((v) => v.type.name);
                let bool: any = [];
                for (let i = 0; i < selectedTypeFilter.length; i++) {
                  if (types.indexOf(selectedTypeFilter[i]) >= 0) {
                    bool = [...bool, selectedTypeFilter[i]];
                  }
                }
                return bool.length === selectedTypeFilter.length;
              }
            })
            .filter((item: { name: string }) =>
              pokemonState.compare
                .map((value) => value.name)
                .indexOf(item.name) >= 0
                ? false
                : true
            )
            .map(
              (
                item: {
                  id: number;
                  name: string;
                  sprites: { front_default: string };
                  types: { type: { name: string } }[];
                },
                key: number
              ) => (
                <div
                  className="item"
                  key={key}
                  onClick={onPokemon.bind(null, item.name)}
                >
                  <div className="wrap-img">
                    <img src={item.sprites.front_default} />
                  </div>
                  <div className="wrap-summary">
                    <div className="number">#{item.id}</div>
                    <div className="name">{item.name}</div>
                    <div className="types">
                      {item.types.map((type, childKey) => (
                        <span
                          className={`type ${type.type.name}`}
                          key={childKey}
                        >
                          {type.type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
        {pokemonState.isLoadingGetPokemon && (
          <div style={{ position: "relative", textAlign: "center" }}>
            <i className="fas fa-circle-notch fa-spin"></i>
          </div>
        )}
        {!isFetching && pokemonState.successGetPokemon && (
          <button type="button" onClick={onLoadMore}>
            Load more
          </button>
        )}
      </div>
      <button
        type="button"
        className="filter-button"
        style={{}}
        onClick={() => setShowFilter(!showFilter)}
      >
        <i className="fas fa-sliders-h"></i>
      </button>
      <Modal
        show={showFilter}
        title={"Filter"}
        onClose={(result) => {
          setShowFilter(result);
        }}
      >
        <>
          {pokemonState.isLoadingGetPokemon && (
            <div style={{ position: "relative", textAlign: "center" }}>
              <i className="fas fa-circle-notch fa-spin"></i>
            </div>
          )}
          {!pokemonState.isLoadingGetPokemon && (
            <div className="filter-type">
              <div className="filter-title">Type</div>
              <div className="list-of-type">
                {pokemonState.successGetPokemon &&
                  pokeTypes.map((item: string, key: number) => (
                    <div
                      className={`type-option ${
                        selectedTypeFilter.indexOf(item) >= 0 ? "active" : ""
                      }`}
                      key={key}
                      onClick={onSelectTypeFilter.bind(null, item)}
                    >
                      {item}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
};

export default Home;
