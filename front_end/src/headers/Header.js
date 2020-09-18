import React from 'react'
import MainMenu from "../containers/MainMenu";
import "../stylesheets/Header.css"
import DateCalendar from "../forms/DateCalendar"

class Header extends React.Component {

    state = {
        menuClicked: false,
        calendarClicked: false,
    }

    onClickHandler = () => {
        let menuClicked = !this.state.menuClicked
        this.setState({
            menuClicked: menuClicked
        })
    }

    //triggered on user clicking calendar buttons
    renderDate = (e) => {
        if (e.target.className === "arrow right") {
            let date = this.props.date
            date.setDate(date.getDate() + 1)
            this.props.setDate(date)
            return this.props.date

        } else if (e.target.className === "arrow left") {
            let date = this.props.date
            date.setDate(date.getDate() - 1)
            this.props.setDate(date)
            return this.props.date

        } else if (e.target.className === "date-picker") {
            this.setState({
                calendarClicked: !this.state.calendarClicked
            })

        } else if (e.target.className === "date-now") {
            let date = new Date()
            this.props.setDate(date)
        }
    }

    //used to display current state:date in header.
    getDate = () => {
        if (this.props.date) {
            let today = new Date()
            if (this.props.date === today){
                return String("Today")
            } else {
                let date = this.props.date
                let NewDate = parseInt(date.getMonth()+1)  + "-" +  date.getDate() + "-" + date.getFullYear()
                return String(NewDate)
            }
        } else {
            return "Today"
        }
    }

    toggleCalendar = () => {
        this.setState({
            calendarClicked: !this.state.calendarClicked
        })
    }


    render() {
        return(
            <nav>
                <ul className="main-header">
                    <li>
                        <div onClick={this.onClickHandler}>
                            <div id="main-menu-button"></div>
                            <div id="main-menu-button"></div>
                            <div id="main-menu-button"></div>
                        </div>

                    </li>
                    <li className="date-picker-container">
                            <span className="arrow left" value="date-back" onClick={this.renderDate}></span>
                            <span className="date-picker" value="date-picker" onClick={this.renderDate}>
                                {this.getDate()}
                                {this.state.calendarClicked ? <DateCalendar date={this.props.date} setDate={this.props.setDate} toggleCalendar={this.toggleCalendar}/> : null}
                            </span>
                            <span className="arrow right" value="date-forward" onClick={this.renderDate}></span>
                    </li>
                    <li style={{fontSize: "20px", padding: "10px"}} className="date-now" onClick={this.renderDate}>Today</li>
                </ul>
                <div>{this.state.menuClicked ? <MainMenu menuClickHandler={this.props.menuClickHandler} onClickHandler={this.onClickHandler}/> : null}</div>
            </nav>
        )
    }

}

export default Header