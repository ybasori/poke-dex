export interface Action {
  payload: any;
  type: string;
}

export interface PokemonState {
  isLoadingGetPokemon: boolean;
  successGetPokemon: any;
  errorGetPokemon: any;
  isLoadingGetPokemonDetail: boolean;
  successGetPokemonDetail: any;
  errorGetPokemonDetail: any;
  compare: any[];
}

export interface Reducers {
  pokemon: PokemonState;
}
