import React from 'react';
import { connect } from 'react-redux';
import { Box, Divider, Tab, Tabs } from '@mui/material';

import { SearchBar } from './partials/SearchBar/SearchBar';
import { PokeTable } from './partials/PokeTable/PokeTable';
import { PokeModal } from './partials/PokeModal/PokeModal';

let App = ({ error, showModal }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return <>
    <h2>Pokedex</h2>
    <Box sx={{ marginTop: '1em', width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Search" />
          <Tab label="Favorites" />
        </Tabs>
      </Box>
    </Box>
    {value === 0 && (
      <Box sx={{ marginTop: '1em' }}>
        {error ? <p className="error">{error}</p> : ''}
        <SearchBar />
        <Divider>-</Divider>
        <PokeTable />
      </Box>
    )}
    {value === 1 && (
      <>
        <PokeTable showFavorites={true}/>
      </>
    )}
    {showModal && <PokeModal />}
  </>
}
App = connect(state => {
  return {
    ...state
  }
})(App);


export { App }
