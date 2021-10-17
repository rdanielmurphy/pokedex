export const API_BASE = 'https://pokeapi.co/api/v2';

export const getPokeURL = (fullPokeData) => `${API_BASE}/pokemon/${fullPokeData.id}/`;

export const compressedPokeData = (fullPokeData) => ({
  pokemon: { name: fullPokeData.name, url: getPokeURL(fullPokeData) },
  slot: null // don't use so don't care
});

export const debounce = (func, wait) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};