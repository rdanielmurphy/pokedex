import * as React from 'react';
import { connect } from 'react-redux'
import { actions } from '../../redux-store'
import { Box, InputAdornment, InputLabel, FormControl, MenuItem, Select, Stack, TextField } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { debounce } from 'lodash';

import { fetchPokemonList } from '../../thunks';

const SearchBarComp = ({ dispatch, searchInput, searchType }) => {
    const executeSearch = React.useCallback(debounce(() => dispatch(fetchPokemonList()), 1000), []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleDropdownChange = (event) => {
        dispatch({
            type: actions.SEARCH_TYPE,
            payload: event.target.value
        });
        executeSearch();
    };

    const handleInputChange = (event) => {
        dispatch({
            type: actions.SEARCH_INPUT,
            payload: event.target.value
        });
        executeSearch();
    };

    return (
        <Stack direction="row" spacing={1}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        value={searchType}
                        label="Type"
                        onChange={handleDropdownChange}>
                        <MenuItem value={'ability'}>Ability</MenuItem>
                        <MenuItem value={'pokemon'}>Name</MenuItem>
                        <MenuItem value={'type'}>Type</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                onChange={handleInputChange}
                value={searchInput}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }} />
        </Stack>
    )
};

export const SearchBar = connect(state => state)(SearchBarComp);