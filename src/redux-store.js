import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { getPokeURL } from './helpers';

const actions = {
  SEARCH_INPUT: 'search_input',
  SEARCH_TYPE: 'search_type',
  SEARCH_POKEMON_ERROR: 'search_poke_list_error',
  SEARCH_POKEMON_SUCCESS: 'search_poke_list_success',
  FETCH_POKEMON_ERROR: 'fetch_poke_error',
  FETCH_POKEMON_SUCCESS: 'fetch_poke_success',
  UPDATE_POKEMON_CACHE: 'update_poke_cache',
  TOGGLE_VIEW_POKEMON: 'toggle_view_pokemon',
  ADD_FAV_POKEMON: 'add_fav_pokemon',
  REMOVE_FAV_POKEMON: 'remove_fav_pokemon',
}

//--> Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case actions.SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload,
      }
      case actions.SEARCH_TYPE:
        return {
          ...state,
          searchType: action.payload,
        }
    case actions.SEARCH_POKEMON_ERROR:
      return {
        ...state,
        currentPokemon: null,
        searchResults: [],
        error: "Could not find any Pokemon"
      }
    case actions.SEARCH_POKEMON_SUCCESS:
      return {
        ...state,
        currentPokemon: null,
        searchResults: action.payload,
        error: null
      }
    case actions.FETCH_POKEMON_ERROR:
      return {
        ...state,
        currentPokemon: null,
        error: "Could not retrieve Pokemon"
      }
    case actions.FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        currentPokemon: action.payload,
        error: null
      }
    case actions.UPDATE_POKEMON_CACHE:
      const pokeCache = Object.assign({}, state.pokeCache)
      pokeCache[getPokeURL(action.payload)] = action.payload;

      return {
        ...state,
        pokeCache: pokeCache,
      }
    case actions.TOGGLE_VIEW_POKEMON:
      return {
        ...state,
        showModal: action.payload,
      }
    case actions.ADD_FAV_POKEMON:
      const pokemonToAdd = action.payload;
      let favs1 = JSON.parse(localStorage.getItem("poke_faves"));
      if (favs1 === undefined || favs1 === null) {
        favs1 = {};
      }
      favs1[pokemonToAdd.url] = pokemonToAdd;
      localStorage.setItem("poke_faves", JSON.stringify(favs1));
      return {
        ...state,
        favPokemon: favs1,
      }
    case actions.REMOVE_FAV_POKEMON:
      const pokemonToRemove = action.payload;
      let favs2 = JSON.parse(localStorage.getItem("poke_faves"));
      if (favs2) {
        delete favs2[pokemonToRemove.url];
        localStorage.setItem("poke_faves", JSON.stringify(favs2));
      } else {
        favs2 = {};
      }
      return {
        ...state,
        favPokemon: favs2,
      }
    default:
      return state
  }
}

const currentFavs = JSON.parse(localStorage.getItem("poke_faves"));
const initialState = {
  favPokemon: currentFavs ? currentFavs : {},
  currentPokemon: null,
  error: null,
  pokeCache: {},
  searchInput: '',
  searchType: 'pokemon',
  searchResults: [],
  showModal: false,
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export { store, actions }
