import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DataTable from '../Containers/DataTable/DataTable';

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { addEquipment, updateEquipment, removeEquipment } from '../Store/equipment/actions';
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
    addEquipment: (data: Equipment[]) => void;
    updateEquipment: (data: Equipment[]) => void;
    removeEquipment: (data: string[]) => void;
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
                                title: "Name",
                                name: 'name',
                            },
                            {
                                title: "Description",
                                name: 'description',
                            },
                        ]}
                        rows={equipment}
                        onRowsChanged={this.props.updateEquipment}
                        onRowsAdded={this.props.addEquipment}
                        onRowsDeleted={this.props.removeEquipment}
                        readonly={this.props.session.type == "normal" ? true : false}
                    />
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = ({ equipment: { equipment }, login: { session }}: ApplicationState): IStateProps => ({ equipment, session })

const mapDispatchToProps = (dispatch: Dispatch<EquipmentAction>) => {
    return {
        addEquipment: bindActionCreators(addEquipment, dispatch),
        updateEquipment: bindActionCreators(updateEquipment, dispatch),
        removeEquipment: bindActionCreators(removeEquipment, dispatch),
    }
}
export default withStyles(styles)(connect<IStateProps, IDispatchProps, IProps>(mapStateToProps, mapDispatchToProps)(EquipmentsView));