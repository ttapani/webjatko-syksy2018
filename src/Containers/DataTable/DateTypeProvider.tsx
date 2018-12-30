import React from 'react';
import { format, parse } from 'date-fns'
import { fi } from 'date-fns/locale'
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const DateFormatter = ({ value }) => {
    return value ? format(parse(value, 'yyyy-MM-dd', new Date()), 'PP', { locale: fi }) : '';
}

const DateTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={DateFormatter}
      {...props}
    />
);

export default DateTypeProvider;