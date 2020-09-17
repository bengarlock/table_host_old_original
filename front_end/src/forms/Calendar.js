//credit: https://github.com/wojtekmaj/react-calendar

import React, { Component } from 'react';
import Calendar from 'react-calendar';
import "../stylesheets/Calendar.css"

class DateCalendar extends Component {
    state = {
        date: this.props.date,
    }

    onChange = date => {
        this.setState({
            date: date
        })
        this.props.setDate(date)
        this.props.toggleCalendar()
    }

    render() {
        const { value } = this.state;
        return (
            <div className="calendar-container">
                <main>
                    <Calendar
                        onChange={this.onChange}
                        showWeekNumbers
                        value={value}
                    />
                </main>
            </div>
        );
    }
}

export default DateCalendar