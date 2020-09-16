import React from 'react'
import MainMenu from "../containers/MainMenu";
import "../stylesheets/Header.css"
import DateCalendar from "../forms/Calendar"

class Header extends React.Component {

    state = {
        menuClicked: false,
        calendarClicked: false,
        date: '',
    }

    onClickHandler = () => {
        let menuClicked = !this.state.menuClicked
        this.setState({
            menuClicked: menuClicked
        })
    }

    componentDidMount() {
        let today = new Date()
        this.setState({
            date: today
        })
        console.log()
    }

    renderDate = (e) => {
        if (e.target.className === "arrow right") {
            let date = this.state.date
            date.setDate(date.getDate() + 1)
            this.setState({
                date: date
            })
            return this.state.date
        } else if (e.target.className === "arrow left") {
            let date = this.state.date
            date.setDate(date.getDate() - 1)
            this.setState({
                date: date
            })
            return this.state.date
        } else if (e.target.className === "date-picker") {
            this.setState({
                calendarClicked: !this.state.calendarClicked
            })
        }
    }

    getDate = () => {
        if (this.state.date) {
            let today = new Date()
            if (this.state.date === today){
                return String("Today")
            } else {
                let date = this.state.date
                let NewDate = parseInt(date.getMonth()+1)  + "-" +  date.getDate() + "-" + date.getFullYear()
                return String(NewDate)
            }
        } else {
            return "Today"
        }

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
                                {this.state.calendarClicked ? <DateCalendar /> : null}
                            </span>
                            <span className="arrow right" value="date-forward" onClick={this.renderDate}></span>
                    </li>
                    <li></li>
                </ul>

                <div>{this.state.menuClicked ? <MainMenu menuClickHandler={this.props.menuClickHandler} onClickHandler={this.onClickHandler}/> : null}</div>
            </nav>
        )
    }

}

export default Header