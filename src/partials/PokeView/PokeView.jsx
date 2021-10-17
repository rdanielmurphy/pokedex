import { connect } from 'react-redux'
import { Card, CardContent, CardHeader, Grid, List, ListItem, ListItemText } from '@mui/material';

import './PokeView.css';

const PokeViewComp = ({ currentPokemon }) => {
    if (currentPokemon !== null) {
        return (
            <Grid container spacing={1}>
                {currentPokemon.abilities.length > 0 && (
                    <Grid item md={3}>
                        <Card>
                            <CardHeader title="Abilities" />
                            <CardContent>
                                <List dense>
                                    {currentPokemon.abilities.map((a) => (
                                        <ListItem key={a.ability.name}>
                                            <ListItemText primary={a.ability.name} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                {currentPokemon.held_items.length > 0 && (
                    <Grid item md={3}>
                        <Card>
                            <CardHeader title="Held Items" />
                            <CardContent>
                                <List dense>
                                    {currentPokemon.held_items.map((i) => (
                                        <ListItem key={i.item.name}>
                                            <ListItemText primary={i.item.name} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                {currentPokemon.moves.length > 0 && (
                    <Grid item md={3}>
                        <Card>
                            <CardHeader title="Moves" />
                            <CardContent>
                                <List dense>
                                    {currentPokemon.moves.map((m) => (
                                        <ListItem key={m.move.name}>
                                            <ListItemText primary={m.move.name} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                {currentPokemon.types.length > 0 && (
                    <Grid item md={3}>
                        <Card>
                            <CardHeader title="Types" />
                            <CardContent>
                                <List dense>
                                    {currentPokemon.types.map((t) => (
                                        <ListItem key={t.type.name}>
                                            <ListItemText primary={t.type.name} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
        )
    } else {
        return <></>;
    }
};

export const PokeView = connect(state => state)(PokeViewComp);