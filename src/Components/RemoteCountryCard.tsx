import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Typography, createStyles, CardActionArea, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import { RemoteCountry } from '../Types/RemoteCountry';

interface ICountryProps extends WithStyles<typeof styles> {
    country: RemoteCountry,
    onClick: () => void,
}

const styles = () => createStyles({
    card: {
        maxWidth: 345,
    },
    title: {
        marginBottom: 16,
        fontSize: 14
    },
    name: {
        marginBottom: 10
    },
    button: {
        //minWidth: 345,
    },
    media: {
        height: 200,
    },
    pos: {
        marginBottom: 10,
    },
});

const RemoteCountryCard: React.SFC<ICountryProps> = (props) => {
    const { classes, onClick } = props;

    return (
        <Card className={classes.card}>
            <CardActionArea className={classes.button} onClick={onClick} disabled={true}>
                <CardMedia
                    component="img"
                    image={props.country.flag}
                    title="Flag of {props.country.name}"
                    style={{
                        objectFit: "scale-down",
                    }}
                />
                <CardContent>
                    <Typography className={classes.name} variant="headline" component="h2">
                        {props.country.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.country.region}
                    </Typography>
                    <Typography component="p">
                        Population: {Number(props.country.population).toLocaleString()}
                    </Typography>
                    <Typography component="p">
                        Capital: {props.country.capital}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withStyles(styles)(RemoteCountryCard);