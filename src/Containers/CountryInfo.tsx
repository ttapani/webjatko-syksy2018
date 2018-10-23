import React from 'react';
import { createStyles, Typography, ListItemIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Router, { withRouter, SingletonRouter } from 'next/router'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LanguageIcon from '@material-ui/icons/Language';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import Map from '@material-ui/icons/Map';
import People from '@material-ui/icons/People';
import LocationCity from '@material-ui/icons/LocationCity';

type CountryQuery = {
    name: string;
}

type CountryData = {
    name: string;
    capital?: string;
    population?: string;
    region?: string;
    currencies?: Currency[];
    languages?: Language[];
}

type Currency = {
    code: string;
    name: string;
    symbol: string;
}

type Language = {
    iso639_2: string;
    name: string;
    nativeName: string;
}

interface ICountryInfoProps extends WithStyles<typeof styles> {
    router: SingletonRouter<CountryQuery>
}

interface ICountryInfoState {
    loading: boolean;
    country: CountryData;
}

const styles = () => createStyles({
    card: {
        minWidth: 345,
        maxWidth: 345,
    },
    title: {
        textAlign: 'center',
    },
    name: {
        marginBottom: 16
    },
});

class CountryInfo extends React.Component<ICountryInfoProps, ICountryInfoState> {
    constructor(props: ICountryInfoProps) {
        super(props);
        this.state = { loading: false, country: { name: this.props.router.query.name } };
    }

    async getData(): Promise<JSON> {
        this.setState({ ...this.state, loading: true });
        const res = await fetch(`https://restcountries.eu/rest/v2/name/${Router.query.name}`);
        const json = await res.json();
        this.setState({ ...this.state, country: json[0], loading: false });
        return json;
    }

    componentDidMount() {
        this.getData();
    }

    public render(): React.ReactNode {
        const { classes } = this.props;
        const { country } = this.state;
        return (
            <Grid container direction="column">
                <Grid container direction="row" justify="flex-start" alignItems="center">
                    <Grid item>
                            <IconButton onClick={() => Router.push("/remotecountries")}>
                                <ArrowBackIcon />
                            </IconButton>
                    </Grid>
                    <Grid item className={classes.title}>
                        <Typography variant="title">
                            {this.props.router.query.name || "Loading"}
                        </Typography>
                        {console.log(this.props)}
                        {console.log(this.state)}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item>
                        <List dense>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationCity/>
                                </ListItemIcon>
                                <ListItemText primary={`Capital: ${country.capital ? country.capital : "loading"}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <People/>
                                </ListItemIcon>
                                <ListItemText primary={`Population: ${country.population ? Number(country.population).toLocaleString() : "loading"}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Map/>
                                </ListItemIcon>
                                <ListItemText primary={`Region: ${country.region ? country.region : "Loading"}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <EuroSymbol/>
                                </ListItemIcon>
                                <ListItemText primary={"Currencies: "} inset/>
                            </ListItem>
                            <ListItem>
                                <List dense>
                                    {country.currencies ? country.currencies.map((currency) => <ListItem key={currency.code}><ListItemText primary={`${currency.name} ${currency.code}`}/></ListItem>): <ListItem><ListItemText primary="Loading"/></ListItem>}
                                </List>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LanguageIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Languages: "}/>
                            </ListItem>
                            <ListItem>
                                <List dense>
                                    {country.languages ? country.languages.map((language) => <ListItem key={language.iso639_2}><ListItemText primary={`${language.name} ${language.nativeName}`}/></ListItem>): <ListItem><ListItemText primary="Loading"/></ListItem>}
                                </List>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

}

export default withStyles(styles)(withRouter(CountryInfo));