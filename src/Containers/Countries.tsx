import React from 'react';
import CountryCard from '../Components/CountryCard';
import Grid from '@material-ui/core/Grid';
import { createStyles, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Country } from '../Types/Country';

interface ICountriesProps extends WithStyles<typeof styles> {
    countries: any[],
    onClick: (country: Country) => void,
}

interface ICountriesState {
    countries: any[];
}

const styles = () => createStyles({
    root: {
        flexGrow: 1,
    }
});

class Countries extends React.Component<ICountriesProps, ICountriesState> {
    constructor(props) {
        super(props);
        this.state ={ countries: []};
    }

    componentDidMount() {
        if(this.props.countries !== undefined) {
            this.setState({ countries: this.props.countries});
        }
    }

    componentWillReceiveProps({countries}) {
        this.setState({ ...this.state, countries });
    }

    handleCountryClick = (country: Country) => {
        event.preventDefault();
        return this.props.onClick(country);
    }

    private printCountry(country: any) {
        const item: Country = {ID: country.ID, name: country.name, population: country.population, percentage: country.percentage, position: country.position};
        return (
            <Grid item key={country.ID}>
                <CountryCard
                    country={item}
                    onClick={() => this.handleCountryClick(item)}>
                </CountryCard>
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

export default withStyles(styles)(Countries);