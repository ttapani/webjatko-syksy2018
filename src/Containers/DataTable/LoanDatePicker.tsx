import React from 'react';
import classNames from 'classnames';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { DatePicker } from 'material-ui-pickers';
import { format } from 'date-fns'
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons'
import { IconButton } from '@material-ui/core';
import isSameDay from 'date-fns/isSameDay'
import isWithinInterval from 'date-fns/isWithinInterval'
import red from '@material-ui/core/colors/red';
import { LoanInterval } from '../LoansTable';
import parse from 'date-fns/fp/parse';
import isValid from 'date-fns/isValid'

interface IProps extends WithStyles<typeof styles> {
    title: string;
    value: string;
    disabled: boolean;
    handleChange: (value) => void;
    reservedTimeRanges?: Array<LoanInterval>;
}

interface IState {
}

const styles = (theme: Theme) => createStyles({
    dayWrapper: {
        position: 'relative',
    },
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: '0 2px',
        color: 'inherit',
    },
    customDayHighlight: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '2px',
        right: '2px',
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: '50%',
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled,
    },
    highlightNonCurrentMonthDay: {
        color: '#676767',
    },
    highlight: {
        background: red[700],
        color: theme.palette.common.white,
    },
    firstHighlight: {
        extend: 'highlight',
        borderTopLeftRadius: '50%',
        //borderBottomLeftRadius: '50%',
    },
    endHighlight: {
        extend: 'highlight',
        //borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    },
});

class LoanDatePicker extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
        }
    }

    handleChange = (date) => {
        const value = date ? format(date, 'yyyy-MM-dd') : null;
        this.props.handleChange(value);
    }

    renderDay = (date, selectedDate, dayInCurrentMonth) => {
        const { classes } = this.props;
        const parseDate = (date) => parse(new Date())('yyyy-MM-dd')(date);
      
        let dayIsBetween = false;
        let isFirstDay = false;
        let isLastDay = false;
        let start = null;
        let end = null;

        if(this.props.reservedTimeRanges.length > 0) {
            for(let reservation of this.props.reservedTimeRanges) {
                start = parseDate(reservation.begins);
                end = parseDate(reservation.ends);
                if(isValid(start) && isValid(end)) {
                    dayIsBetween = isWithinInterval(date, { start, end });
                    isFirstDay = isSameDay(date, start);
                    isLastDay = isSameDay(date, end);
                }
                else {
                    // Something should be done?
                }
                if(dayIsBetween || isFirstDay || isLastDay)
                    break;
            }
        }

        const wrapperClassName = classNames({
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isFirstDay,
            [classes.endHighlight]: isLastDay,
        });

        const dayClassName = classNames(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
            [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
        });

        return (
            <div className={wrapperClassName}>
                <IconButton className={dayClassName}>
                    <span> {format(date, 'd')} </span>
                </IconButton>
            </div>
        );
    }

    public render() {
        const { value, title } = this.props;
        return (
            <DatePicker
                disabled={this.props.disabled}
                allowKeyboardControl
                clearable
                placeholder={title}
                value={value ? value : null}
                // Format date back into db format
                onChange={this.handleChange}
                format="PP"
                leftArrowIcon={<KeyboardArrowLeft/>}
                rightArrowIcon={<KeyboardArrowRight/>}
                renderDay={this.renderDay}
            >
            </DatePicker>
        );
    }
}
export default withStyles(styles)(LoanDatePicker);