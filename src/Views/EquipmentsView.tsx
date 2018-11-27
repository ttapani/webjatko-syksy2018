import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DataTable from '../Containers/DataTable/DataTable';

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { setEquipment } from '../Store/equipment/actions';
import { ApplicationState } from '../Store/store';
import { EquipmentState, Equipment, EquipmentAction } from '../Store/equipment/types';

interface IProps extends WithStyles<typeof styles> {
    equipment: Equipment[];
    setEquipment: (data) => void;
}

interface IState {

}

const styles = () => createStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        midWidth: 700,
    },
    tableContainer: {
        height: 320,
    },
});

class EquipmentsView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    setEqupment = (data) => {
        this.props.setEquipment(data);
    }

    public render(): React.ReactNode {
        const { classes, equipment } = this.props;
        return (
            <div className={classes.tableContainer}>
                <Paper className={classes.root}>
                    <DataTable
                        columns={[
                            {
                                title: "User",
                                name: 'name',
                            },
                            {
                                title: "Description",
                                name: 'description',
                            },
                        ]}
                        rows={equipment}
                        onRowsChange={this.setEqupment}
                    />
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = ({ equipment: { equipment }}: ApplicationState): EquipmentState => ({ equipment })

const mapDispatchToProps = (dispatch: Dispatch<EquipmentAction>) => {
    return {
        setEquipment: bindActionCreators(setEquipment, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EquipmentsView));