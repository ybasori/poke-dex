import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getPokemonDetail, setComparePokemon } from "../../_redux/pokemon";
import { Reducers } from "../../_redux/types";
import "./style.scss";

const Pokemon = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const pokemonState = useSelector((state: Reducers) => state.pokemon);
  const { pokemon }: any = useParams();

  const fetchDataPokemon = useCallback(
    (name) => {
      dispatch(getPokemonDetail({ name: name }));
    },
    [dispatch]
  );

  const onCompare = (value: any) => {
    dispatch(setComparePokemon([...pokemonState.compare, value]));
    history.push("/");
  };

  useEffect(() => {
    if (!pokemonState.successGetPokemonDetail) {
      fetchDataPokemon(pokemon);
    }
  }, [fetchDataPokemon, pokemon, pokemonState.successGetPokemonDetail]);
  return (
    <div id="pokemon">
      {pokemonState.isLoadingGetPokemonDetail && (
        <div style={{ position: "relative", textAlign: "center" }}>
          <i className="fas fa-circle-notch fa-spin"></i>
        </div>
      )}
      {pokemonState.successGetPokemonDetail && (
        <>
          <div className="status" style={{ margin: "auto" }}>
            <div className="status-summary-wrap">
              <div className="image">
                {pokemonState.successGetPokemonDetail.sprites && (
                  <img
                    src={
                      pokemonState.successGetPokemonDetail.sprites.front_default
                    }
                  />
                )}
              </div>
              <div className="status-summary">
                <div className="name">
                  #{pokemonState.successGetPokemonDetail.order}{" "}
                  {pokemonState.successGetPokemonDetail.name}
                </div>
                <div className="stats">
                  <div className="stat">
                    <div className="stat-label">Height</div>
                    <div className="stat-value-text">
                      {pokemonState.successGetPokemonDetail.height}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Weight</div>
                    <div className="stat-value-text">
                      {pokemonState.successGetPokemonDetail.weight}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Abilities</div>
                    <div className="stat-value-text">
                      {pokemonState.successGetPokemonDetail.abilities
                        .map((ability: { ability: { name: string } }) =>
                          ability.ability.name.replace(/-/i, " ")
                        )
                        .join(", ")}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Type</div>
                    <div className="stat-value-text">
                      {pokemonState.successGetPokemonDetail.types
                        .map(
                          (type: { type: { name: string } }) => type.type.name
                        )
                        .join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="status-summary-wrap"
              style={{ width: "100%", margin: "auto" }}
            >
              <div className="status-summary" style={{ width: "100%" }}>
                <div className="stats">
                  {pokemonState.successGetPokemonDetail.stats.map(
                    (
                      stat: { stat: { name: string }; base_stat: number },
                      index: number
                    ) => (
                      <div className="stat" key={index}>
                        <div className="stat-label">
                          {stat.stat.name
                            .replace(/-/i, " ")
                            .replace("special", "sp")}
                        </div>
                        <div className="stat-value">
                          <div className="stat-value-bg">
                            <div
                              className="stat-value-number"
                              style={{
                                width: `${
                                  stat.base_stat > 100 ? 100 : stat.base_stat
                                }%`,
                              }}
                            >
                              {stat.base_stat}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", margin: "auto", marginTop: 10 }}>
              <button
                style={{ fontSize: 10 }}
                type="button"
                onClick={onCompare.bind(
                  null,
                  pokemonState.successGetPokemonDetail
                )}
              >
                Compare
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Pokemon;
