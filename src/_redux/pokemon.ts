import { Action, PokemonState } from "./types";
import { delay, put, select, takeLatest } from "redux-saga/effects";

import api from "../_configs/api";

const GET_POKEMON = "GET_POKEMON";
const GET_POKEMON_LOADING = "GET_POKEMON_LOADING";
const GET_POKEMON_SUCCESS = "GET_POKEMON_SUCCESS";
const GET_POKEMON_ERROR = "GET_POKEMON_ERROR";
const GET_POKEMON_RESET = "GET_POKEMON_RESET";

const SET_POKEMON_DETAIL = "SET_POKEMON_DETAIL";

const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
const GET_POKEMON_DETAIL_LOADING = "GET_POKEMON_DETAIL_LOADING";
const GET_POKEMON_DETAIL_SUCCESS = "GET_POKEMON_DETAIL_SUCCESS";
const GET_POKEMON_DETAIL_ERROR = "GET_POKEMON_DETAIL_ERROR";
const GET_POKEMON_DETAIL_RESET = "GET_POKEMON_DETAIL_RESET";

const SET_COMPARE_POKEMON = "SET_COMPARE_POKEMON";

const initState: PokemonState = {
  isLoadingGetPokemon: false,
  successGetPokemon: null,
  errorGetPokemon: null,
  isLoadingGetPokemonDetail: false,
  successGetPokemonDetail: null,
  errorGetPokemonDetail: null,
  compare: [],
};

const pokemon = (state = initState, action: Action) => {
  switch (action.type) {
    case GET_POKEMON_LOADING:
      return {
        ...state,
        isLoadingGetPokemon: true,
      };

    case GET_POKEMON_SUCCESS:
      return {
        ...state,
        isLoadingGetPokemon: false,
        successGetPokemon: action.payload,
        errorGetPokemon: null,
      };

    case GET_POKEMON_ERROR:
      return {
        ...state,
        isLoadingGetPokemon: false,
        successGetPokemon: null,
        errorGetPokemon: action.payload,
      };

    case GET_POKEMON_RESET:
      return {
        ...state,
        isLoadingGetPokemon: false,
        successGetPokemon: null,
        errorGetPokemon: null,
      };

    case SET_POKEMON_DETAIL:
      return {
        ...state,
        successGetPokemonDetail: action.payload.data,
      };

    case GET_POKEMON_DETAIL_LOADING:
      return {
        ...state,
        isLoadingGetPokemonDetail: true,
        successGetPokemonDetail: null,
        errorGetPokemonDetail: null,
      };

    case GET_POKEMON_DETAIL_SUCCESS:
      return {
        ...state,
        isLoadingGetPokemonDetail: false,
        successGetPokemonDetail: action.payload,
        errorGetPokemonDetail: null,
      };

    case GET_POKEMON_DETAIL_ERROR:
      return {
        ...state,
        isLoadingGetPokemonDetail: false,
        successGetPokemonDetail: null,
        errorGetPokemonDetail: action.payload,
      };

    case GET_POKEMON_DETAIL_RESET:
      return {
        ...state,
        isLoadingGetPokemonDetail: false,
        successGetPokemonDetail: null,
        errorGetPokemonDetail: null,
      };

    case SET_COMPARE_POKEMON:
      return {
        ...state,
        compare: action.payload.data,
      };

    default:
      return { ...state };
  }
};

export default pokemon;

function* getPokemonSaga(action: Action) {
  try {
    yield put({ type: GET_POKEMON_LOADING });
    const data = action.payload.data;
    const { limit, offset } = data;
    const { pokemon: pokemonState } = yield select();
    let response = null;
    let dataState: any[] = [];
    if (
      pokemonState.successGetPokemon &&
      pokemonState.successGetPokemon.offset !== offset
    ) {
      response = yield api.getPokemon({ limit, offset });
      dataState = [...pokemonState.successGetPokemon.results];
    } else {
      response = yield api.getPokemon({ limit });
    }
    for (let i = 0; i < response.data.results.length; i++) {
      const resp = yield api.getPokemon({
        name: response.data.results[i].name,
      });
      response.data.results[i] = resp.data;
    }
    dataState = [...dataState, ...response.data.results];
    response.data.results = dataState;
    yield delay(1000);
    yield put({
      type: GET_POKEMON_SUCCESS,
      payload: { ...response.data, limit, offset },
    });
  } catch (err) {
    yield put({ type: GET_POKEMON_ERROR, payload: err });
  }
}

export const getPokemon = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => ({
  type: GET_POKEMON,
  payload: {
    data: {
      limit,
      offset,
    },
  },
});

export const resetGetPokemon = () => {
  return {
    type: GET_POKEMON_RESET,
  };
};

export const setPokemonDetail = (data: any) => {
  return {
    type: SET_POKEMON_DETAIL,
    payload: { data },
  };
};

export const setComparePokemon = (data: any) => {
  return {
    type: SET_COMPARE_POKEMON,
    payload: { data },
  };
};

function* getPokemonDetailSaga(action: Action) {
  try {
    yield put({ type: GET_POKEMON_DETAIL_LOADING });
    const data = action.payload.data;
    const response = yield api.getPokemon({ name: data.name });
    yield delay(1000);
    yield put({
      type: GET_POKEMON_DETAIL_SUCCESS,
      payload: { ...response.data },
    });
  } catch (err) {
    yield put({ type: GET_POKEMON_DETAIL_ERROR, payload: err });
  }
}

export const getPokemonDetail = ({ name }: { name: string }) => ({
  type: GET_POKEMON_DETAIL,
  payload: {
    data: {
      name,
    },
  },
});

export function* watchPokemon() {
  yield takeLatest(GET_POKEMON, getPokemonSaga);
  yield takeLatest(GET_POKEMON_DETAIL, getPokemonDetailSaga);
}
