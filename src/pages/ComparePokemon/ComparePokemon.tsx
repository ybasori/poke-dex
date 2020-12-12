import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setComparePokemon } from "../../_redux/pokemon";
import { Reducers } from "../../_redux/types";
import "./style.scss";

const ComparePokemon = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const pokemonState = useSelector((state: Reducers) => state.pokemon);

  const onRemove = (value: any) => {
    dispatch(
      setComparePokemon([
        ...pokemonState.compare.filter((item) => item.name !== value.name),
      ])
    );
    history.push("/");
  };

  useEffect(() => {
    if (pokemonState.compare.length === 0) {
      history.push("/");
    }
  }, [history, pokemonState.compare.length]);

  return (
    <div id="compare-pokemon">
      {pokemonState.compare.map((pokemon, key: number) => (
        <div
          className="status"
          style={{ margin: "auto", marginBottom: 10 }}
          key={key}
        >
          <div className="status-summary-wrap">
            <div className="image">
              {pokemon.sprites && <img src={pokemon.sprites.front_default} />}
            </div>
            <div className="status-summary">
              <div className="name">
                #{pokemon.id} {pokemon.name}
              </div>
              <div className="stats">
                <div className="stat">
                  <div className="stat-label">Height</div>
                  <div className="stat-value-text">{pokemon.height}</div>
                </div>
                <div className="stat">
                  <div className="stat-label">Weight</div>
                  <div className="stat-value-text">{pokemon.weight}</div>
                </div>
                <div className="stat">
                  <div className="stat-label">Abilities</div>
                  <div className="stat-value-text">
                    {pokemon.abilities
                      .map((ability: { ability: { name: string } }) =>
                        ability.ability.name.replace(/-/i, " ")
                      )
                      .join(", ")}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-label">Type</div>
                  <div className="stat-value-text">
                    {pokemon.types
                      .map((type: { type: { name: string } }) => type.type.name)
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
                {pokemon.stats.map(
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
              onClick={onRemove.bind(null, pokemon)}
            >
              Change
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComparePokemon;
