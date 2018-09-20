import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Typography, createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';

interface ICountryProps extends WithStyles<typeof styles> {
    position: string,
    name: string,
    population: string,
    percentage: string,
}

const styles = () => createStyles({
    card: {
        maxWidth: 350,
    },
    title: {
        marginBottom: 16,
        fontSize: 14
    },
    name: {
        marginBottom: 16
    }
});

const Country: React.SFC<ICountryProps> = (props) => {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary">
                    #{props.position} Country
                </Typography>
                <Typography className={classes.name} variant="headline" component="h2">
                    {props.name}
                </Typography>
                <Typography component="p">
                    Population: {Number(props.population).toLocaleString()}
                </Typography>
                <Typography component="p">
                    {props.percentage} of the world
                </Typography>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Country);