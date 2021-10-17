import { connect } from 'react-redux'
import { actions } from '../../redux-store'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchPokemon } from '../../thunks';
import useMediaQuery from '@mui/material/useMediaQuery';

import { PokeFavorite } from '../PokeFavorite/PokeFavorite';

const PokeTableComp = ({ dispatch, favPokemon, searchResults, showFavorites }) => {
    const matches = useMediaQuery('(min-width:600px)');

    const handleRowClick = (pokemon) => {
        dispatch(fetchPokemon(pokemon.url));
        dispatch({
            type: actions.TOGGLE_VIEW_POKEMON,
            payload: true,
        });
    };

    const items = showFavorites ? Object.values(favPokemon) : searchResults.map((r) => r.pokemon);
    if (items.length > 0) {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            {matches && <TableCell>Url</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((r) => (
                            <TableRow
                                key={r.name}
                                hover
                                onClick={() => handleRowClick(r)}>
                                <TableCell component="th" padding="checkbox" scope="row">
                                    <PokeFavorite pokemon={r}/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {r.name}
                                </TableCell>
                                {matches && <TableCell component="th" scope="row">
                                    {r.url}
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return <></>
    }
};

export const PokeTable = connect(state => state)(PokeTableComp);