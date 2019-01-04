import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DataTable from '../Containers/DataTable/DataTable';

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { setEquipment } from '../Store/equipment/actions';
import { ApplicationState } from '../Store/store';
import { Equipment, EquipmentAction } from '../Store/equipment/types';
import { Session } from 'src/Store/login/types';
import Error from 'next/error'

interface IProps extends WithStyles<typeof styles> {
}

interface IState {
}

interface IStateProps {
    equipment: Equipment[];
    session: Session;
}

interface IDispatchProps {
    setEquipment: (data) => void;
}

type Props = IStateProps & IProps & IDispatchProps;

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

class EquipmentsView extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);
    }

    setEqupment = (data) => {
        this.props.setEquipment(data);
    }

    public render(): React.ReactNode {
        const { classes, equipment } = this.props;
        if(this.props.session.type == "guest") {
            return <Error statusCode={403} />;
        }
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

const mapStateToProps = ({ equipment: { equipment }, login: { session }}: ApplicationState): IStateProps => ({ equipment, session })

const mapDispatchToProps = (dispatch: Dispatch<EquipmentAction>) => {
    return {
        setEquipment: bindActionCreators(setEquipment, dispatch)
    }
}
export default connect<IStateProps, IDispatchProps, IProps>(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EquipmentsView));