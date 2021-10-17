import { connect } from 'react-redux'
import { actions } from '../../redux-store'
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { red } from '@mui/material/colors';

const PokeFavoriteComp = ({ dispatch, favPokemon, pokemon }) => {
    const handleAddFavoriteClick = () => {
        dispatch({
            type: actions.ADD_FAV_POKEMON,
            payload: pokemon,
        });
    };

    const handleRemoveFavoriteClick = () => {
        dispatch({
            type: actions.REMOVE_FAV_POKEMON,
            payload: pokemon,
        });
    };

    return (
        <>
            {favPokemon && favPokemon[pokemon.url] && (
                <IconButton aria-label="favorite" onClick={(event) => {
                    handleRemoveFavoriteClick();
                    event.stopPropagation();
                }}>
                    <FavoriteIcon sx={{ color: red[500] }} />
                </IconButton>
            )}
            {(!favPokemon || !favPokemon[pokemon.url]) && (
                    <IconButton aria-label="favorite" onClick={(event) => {
                        handleAddFavoriteClick();
                        event.stopPropagation();
                    }}>
                        <FavoriteBorderIcon sx={{ color: red[500] }} />
                    </IconButton>
                )
            }
        </>
    );
};

export const PokeFavorite = connect(state => state)(PokeFavoriteComp);