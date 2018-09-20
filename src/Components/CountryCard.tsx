import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Typography, createStyles, CardActionArea } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import { Country } from '../Types/Country';

interface ICountryProps extends WithStyles<typeof styles> {
    country: Country,
    onClick: () => void,
}

const styles = () => createStyles({
    card: {
        minWidth: 345,
        maxWidth: 345,
    },
    title: {
        marginBottom: 16,
        fontSize: 14
    },
    name: {
        marginBottom: 16
    },
    button: {
        width: 345,
    }
});

const CountryCard: React.SFC<ICountryProps> = (props) => {
    const { classes, onClick } = props;

    return (
        <Card className={classes.card}>
            <CardActionArea className={classes.button} onClick={onClick}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        #{props.country.position} Country
                    </Typography>
                    <Typography className={classes.name} variant="headline" component="h2">
                        {props.country.name}
                    </Typography>
                    <Typography component="p">
                        Population: {Number(props.country.population).toLocaleString()}
                    </Typography>
                    <Typography component="p">
                        {props.country.percentage} of the world
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withStyles(styles)(CountryCard);