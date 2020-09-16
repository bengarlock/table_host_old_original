//credit: https://github.com/wojtekmaj/react-calendar

import React, { Component } from 'react';
import Calendar from 'react-calendar';
import "../stylesheets/Calendar.css"

class DateCalendar extends Component {
    state = {
        value: this.props.date,
    }

    onChange = value => {
        this.setState({ value })
        this.props.calendarSetDate(value)
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