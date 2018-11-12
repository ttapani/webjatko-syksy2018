import React from 'react';
import RemoteCountryCard from '../Components/RemoteCountryCard';
import Grid from '@material-ui/core/Grid';
import { createStyles, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { RemoteCountry } from '../Types/RemoteCountry';
import 'isomorphic-unfetch';
import LinearProgress from '@material-ui/core/LinearProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from 'next/router'

interface ICountriesProps extends WithStyles<typeof styles> {
}

interface ICountriesState {
    countries: any[];
    loading: boolean;
}

const styles = () => createStyles({
    root: {
        flexGrow: 1,
    }
});

class RemoteCountries extends React.Component<ICountriesProps, ICountriesState> {
    constructor(props) {
        super(props);
        this.state ={ countries: [], loading: false };
    }

    async getData() {
        this.setState({ ...this.state, loading: true });
        const res = await fetch('https://restcountries.eu/rest/v2/all')
        const json = await res.json()
        this.setState({ ...this.state, countries: json, loading: false });
        return json;
    }

    componentDidMount() {
        this.getData();
    }

    private printCountry(country: any) {
        const item: RemoteCountry = {alpha3Code: country.alpha3code, name: country.name, population: country.population, capital: country.capital, flag: country.flag, region: country.region };
        return (
            <Grid item key={country.ID}>
                <RemoteCountryCard
                    country={item}
                    onClick={() => Router.push({ pathname: '/countryinfo', query: { name: item.name }})}>
                </RemoteCountryCard>
            </Grid>
        )
    }
    
    public render(): React.ReactNode {
        const { classes } = this.props;
        return (
            <CssBaseline>
            <div>
            <LinearProgress style={{ visibility: this.state.loading ? 'visible' : 'hidden'}}/>
            <Grid container className={classes.root} style={{ paddingTop: 10 }}>
                <Grid container spacing={8} alignItems="center">
                    {this.state.countries.map(item => this.printCountry(item))}
                </Grid>
            </Grid>
            </div>
            </CssBaseline>
        );
    }
}

export default withStyles(styles)(RemoteCountries);