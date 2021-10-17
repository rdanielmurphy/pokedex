import { actions } from './redux-store';

import { API_BASE, compressedPokeData } from './helpers';

const fetchPokemonList = () => async (dispatch, getState) => {
  const { searchInput, searchType } = getState();

  if (searchType.length > 0 && searchInput.length > 2) {
    try {
      const response = await fetch(`${API_BASE}/${searchType}/${searchInput}`);
      if (!response.ok || response.status === 404) {
        dispatch({
          type: actions.SEARCH_POKEMON_ERROR,
        });
      }
      const data = await response.json();
      const pokemonSearch = searchType === 'pokemon';
      dispatch({
        type: actions.SEARCH_POKEMON_SUCCESS,
        payload: pokemonSearch ? [compressedPokeData(data)] : data.pokemon
      });
      if (pokemonSearch) {
        dispatch({
          type: actions.UPDATE_POKEMON_CACHE,
          payload: data
        });
      }
    } catch (err) {
      dispatch({
        type: actions.SEARCH_POKEMON_ERROR,
      });
    }
  }
}

const fetchPokemon = (url) => async (dispatch, getState) => {
  const { pokeCache } = getState();

  if (pokeCache[url]) {
    dispatch({
      type: actions.FETCH_POKEMON_SUCCESS,
      payload: pokeCache[url]
    })
  }
  else {
    try {
      const response = await fetch(url);
      if (!response.ok || response.status === 404) {
        return dispatch({
          type: actions.FETCH_POKEMON_ERROR,
        })
      }

      const data = await response.json();
      dispatch({
        type: actions.FETCH_POKEMON_SUCCESS,
        payload: data
      });
      dispatch({
        type: actions.UPDATE_POKEMON_CACHE,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: actions.FETCH_POKEMON_ERROR,
      })
    }
  }
}

export { fetchPokemonList, fetchPokemon }
