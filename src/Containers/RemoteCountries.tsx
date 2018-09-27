import React from 'react';
import RemoteCountryCard from '../Components/RemoteCountryCard';
import Grid from '@material-ui/core/Grid';
import { createStyles, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { RemoteCountry } from '../Types/RemoteCountry';
import 'isomorphic-unfetch';

interface ICountriesProps extends WithStyles<typeof styles> {
}

interface ICountriesState {
    countries: any[];
}

const styles = () => createStyles({
    root: {
        flexGrow: 1,
        paddingLeft: 5,
    }
});

class RemoteCountries extends React.Component<ICountriesProps, ICountriesState> {
    constructor(props) {
        super(props);
        this.state ={ countries: []};
    }

    async getData() {
        const res = await fetch('https://restcountries.eu/rest/v2/all')
        const json = await res.json()
        this.setState({ countries: json });
        return json;
    }

    componentDidMount() {
        this.getData();
    }

    private printCountry(country: any) {
        const item: RemoteCountry = {alpha3Code: country.alpha3code, name: country.name, population: country.population, capital: country.capital, flag: country.flag, region: country.region};
        return (
            <Grid item key={country.ID}>
                <RemoteCountryCard
                    country={item}
                    onClick={() => null}>
                </RemoteCountryCard>
            </Grid>
        )
    }
    
    public render(): React.ReactNode {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root}>
                <Grid container spacing={8} direction="column">
                    {this.state.countries.map(item => this.printCountry(item))}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(RemoteCountries);