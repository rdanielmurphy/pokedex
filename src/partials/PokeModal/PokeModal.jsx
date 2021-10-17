import * as React from 'react';
import { connect } from 'react-redux'
import { actions } from '../../redux-store'
import { Avatar, AppBar, Dialog, DialogContent, DialogTitle, IconButton, Slide, Stack, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';

import { PokeView } from '../PokeView/PokeView';
import { PokeFavorite } from '../PokeFavorite/PokeFavorite';
import { compressedPokeData } from '../../helpers';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PokeModalComp = ({ dispatch, currentPokemon }) => {
    const matches = useMediaQuery('(min-width:600px)');
    
    const handleClose = () => {
        dispatch({
            type: actions.TOGGLE_VIEW_POKEMON,
            payload: false,
        });
    };

    return (
        <Dialog
            open
            onClose={handleClose}
            fullScreen
            TransitionComponent={Transition}>
            <DialogTitle>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        {currentPokemon !== null && (
                            <>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Avatar
                                        sx={{ width: 64, height: 64 }}
                                        src={`${currentPokemon.sprites.front_default}`} />
                                    {matches && <Typography variant="h3" component="h3">
                                        {currentPokemon.name} ({currentPokemon.id})
                                    </Typography>}
                                    {!matches && <Typography variant="h5" component="h5">
                                        {currentPokemon.name} ({currentPokemon.id})
                                    </Typography>}
                                </Stack>
                                <PokeFavorite pokemon={compressedPokeData(currentPokemon).pokemon}/>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </DialogTitle>
            <DialogContent>
                <PokeView />
            </DialogContent>
        </Dialog>);
};

export const PokeModal = connect(state => state)(PokeModalComp);