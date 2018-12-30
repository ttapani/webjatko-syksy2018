import React from 'react';
import { TableEditRow  } from '@devexpress/dx-react-grid-material-ui';
import { Subtract } from 'utility-types';

interface WithTableDataProps {
    data: Array<any>;
}

const withTableData = (data) => <P extends WithTableDataProps & TableEditRow.CellProps>(Component: React.ComponentType<P>) =>
    class WithTableData extends React.Component<Subtract<P, WithTableDataProps> & TableEditRow.CellProps, null> {
        render() {
            return <Component data={data} {...this.props} />;
        }
}

export default withTableData;