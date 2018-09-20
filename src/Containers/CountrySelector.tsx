import React from 'react';
import Countries from './Countries';
import Grid from '@material-ui/core/Grid';
import { Country } from '../Types/Country';
import { createStyles, WithStyles, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

interface ICountrySelectorProps extends WithStyles<typeof styles> {
}

interface ICountrySelectorState {
    selectedCountries: any [],
}

const styles = () => createStyles({
    root: {
        flexGrow: 1,
    }
});

class CountrySelector extends React.Component<ICountrySelectorProps, ICountrySelectorState> {
    constructor(props) {
        super(props);
        this.state = { selectedCountries: [] };
        this.selectCountry = this.selectCountry.bind(this);
        this.deselectCountry = this.deselectCountry.bind(this);
    }

    countries: any[] = [
        {"ID":"1067","name":"China","population":"1359821466","percentage":"19,66%","position":"1"},
        {"ID":"1068","name":"India","population":"1205624727","percentage":"17,43%","position":"2"},
        {"ID":"1069","name":"United States of America","population":"312237216","percentage":"4,51%","position":"3"},
        {"ID":"1070","name":"Indonesia","population":"240676485","percentage":"3,48%","position":"4"},
        {"ID":"1071","name":"Brazil","population":"195210154","percentage":"2,82%","position":"5"},
        {"ID":"1072","name":"Pakistan","population":"173113821","percentage":"2,50%","position":"6"},
        {"ID":"1073","name":"Nigeria","population":"159685249","percentage":"2,31%","position":"7"},
        {"ID":"1074","name":"Bangladesh","population":"151125475","percentage":"2,19%","position":"8"},
        {"ID":"1075","name":"Russian Federation","population":"143615916","percentage":"2,08%","position":"9"},
        {"ID":"1076","name":"Japan","population":"127352833","percentage":"1,84%","position":"10"},
        {"ID":"1077","name":"Mexico","population":"117886404","percentage":"1,70%","position":"11"},
        {"ID":"1078","name":"Philippines","population":"93444322","percentage":"1,35%","position":"12"},
        {"ID":"1079","name":"Viet Nam","population":"89047402","percentage":"1,29%","position":"13"},
        {"ID":"1080","name":"Ethiopia","population":"87095281","percentage":"1,26%","position":"14"},
        {"ID":"1081","name":"Germany","population":"83017404","percentage":"1,20%","position":"15"},
        {"ID":"1082","name":"Egypt","population":"78075705","percentage":"1,13%","position":"16"},
        {"ID":"1083","name":"Iran (Islamic Republic of)","population":"74462314","percentage":"1,08%","position":"17"},
        {"ID":"1084","name":"Turkey","population":"72137546","percentage":"1,04%","position":"18"},
        {"ID":"1085","name":"Thailand","population":"66400698","percentage":"0,96%","position":"19"},
        {"ID":"1086","name":"France","population":"63230866","percentage":"0,91%","position":"20"},
        {"ID":"1087","name":"Democratic Republic of the Congo","population":"62191161","percentage":"0,90%","position":"21"},
        {"ID":"1088","name":"United Kingdom","population":"62066350","percentage":"0,90%","position":"22"},
        {"ID":"1089","name":"Italy","population":"60508978","percentage":"0,87%","position":"23"},
        {"ID":"1090","name":"Myanmar","population":"51931231","percentage":"0,75%","position":"24"},
        {"ID":"1091","name":"South Africa","population":"51452352","percentage":"0,74%","position":"25"},
        {"ID":"1092","name":"Republic of Korea","population":"48453931","percentage":"0,70%","position":"26"},
        {"ID":"1093","name":"Colombia","population":"46444798","percentage":"0,67%","position":"27"},
        {"ID":"1094","name":"Spain","population":"46182038","percentage":"0,67%","position":"28"},
        {"ID":"1095","name":"Ukraine","population":"46044304","percentage":"0,67%","position":"29"},
        {"ID":"1096","name":"United Republic of Tanzania","population":"44973330","percentage":"0,65%","position":"30"}
    ];

    private selectCountry(country: Country): void {
        if(this.state.selectedCountries.find((c) => c.ID == country.ID) == undefined) {
            this.setState({ selectedCountries: this.state.selectedCountries.concat(country)});
        }
        console.log("added" + JSON.stringify(country));
        console.log(this.state.selectedCountries);
    }

    private deselectCountry(country: Country): void {
        this.setState({ selectedCountries: this.state.selectedCountries.filter((c) => c.ID !== country.ID)})
        console.log("remove" + JSON.stringify(country));
        console.log(this.state.selectedCountries);
    }

    public render(): React.ReactNode {
        return (
            <div>
                <Grid container direction="row">
                    <Grid item>
                        <Grid item>
                            <Typography variant="title">
                            Maat
                            </Typography>
                        </Grid>
                        <Countries countries={this.countries} onClick={(country: Country) => this.selectCountry(country)}></Countries>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <Typography variant="title">
                            Valitut
                            </Typography>
                        </Grid>
                        <Countries countries={this.state.selectedCountries} onClick={(country: Country) => this.deselectCountry(country)}></Countries>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(CountrySelector);