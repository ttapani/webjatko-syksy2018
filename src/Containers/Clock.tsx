import React from 'react';

interface ClockState {
    date: Date;
    updateInterval: number;
    timer: NodeJS.Timer;
}

class Clock extends React.Component<{}, ClockState> {
    constructor(props) {
        super(props);
        this.updateCurrentTime.bind(this);
        this.state = ({ date: new Date(), updateInterval: 1000, timer: null });
    }
    componentDidMount() {
        const { updateInterval } = this.state;
        this.setState({ timer: setInterval(() => this.updateCurrentTime(), updateInterval)});
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    updateCurrentTime() {
        this.setState({ date: new Date() });
    }

    public render(): React.ReactNode {
        const { date } = this.state;
        return (
        <div>
           {date.toLocaleTimeString()}
        </div>
        );
    }
}

export default Clock;