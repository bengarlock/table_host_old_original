import React from 'react'
import MainMenu from "../containers/MainMenu";
import "../stylesheets/Header.css"
import DateCalendar from "../forms/DateCalendar"

class Header extends React.Component {

    state = {
        menuClicked: false,
        calendarClicked: false,
        headerDate: ''
    }

    componentDidMount() {
        this.getDate()
    }

    onClickHandler = () => {
        this.setState({
            menuClicked: !this.state.menuClicked
        })
    }

    //triggered on user clicking calendar buttons
    renderDate = (e) => {
        if (e.target.className === "arrow-right-container" || e.target.className === "arrow right") {
            this.props.date.setDate(this.props.date.getDate() + 1)
            this.props.setDate(this.props.date)

        } else if (e.target.className === "arrow-left-container"  || e.target.className === "arrow left") {
            this.props.date.setDate(this.props.date.getDate() - 1)
            this.props.setDate(this.props.date)

        } else if (e.target.className === "center-date-picker-container" || e.target.className === "center-date-picker") {
            console.log(this.state.calendarClicked)
            this.setState({
                calendarClicked: !this.state.calendarClicked
            })

        } else if (e.target.className === "date-now") {
            let date = new Date()
            this.props.setDate(date)

        } else {
            this.setState({
                menuClicked: false,
                calendarClicked: false
            })
        }
    }

    //used to display custom date text in header.
    getDate = () => {
        let today = new Date()
        let date = this.props.date

        let propsDate = parseInt(date.getMonth() +1 )  + "-" +  date.getDate() + "-" + date.getFullYear()
        let dateToday = parseInt(today.getMonth() +1)  + "-" +  today.getDate() + "-" + today.getFullYear()
        let dateTomorrow = parseInt(today.getMonth() +1 )  + "-" +  (today.getDate() + 1) + "-" + today.getFullYear()

        if (this.props.date) {
            if (propsDate === dateToday) {
                return "Today"
            } else if (propsDate === dateTomorrow) {
                return "Tomorrow"
            } else {
                let date = this.props.date
                let newDate = parseInt(date.getMonth()+1)  + "-" +  date.getDate() + "-" + date.getFullYear()
                return String(newDate)
            }
        }
    }

    toggleCalendar = () => {
        this.setState({
            calendarClicked: !this.state.calendarClicked
        })
    }


    render() {
        return(
            <div >
                <nav className="navigation-header">
                    <ul className="main-header">
                        <li className="main-menu-button-container" onClick={this.onClickHandler}>
                            <div>
                                <div id="main-menu-button"></div>
                                <div id="main-menu-button"></div>
                                <div id="main-menu-button"></div>
                            </div>
                        </li>
                        <li>
                            <div className="date-picker-container">
                                <div className="arrow-left-container" onClick={this.renderDate}>
                                    <div className="arrow left" value="date-back"></div>
                                </div>
                                <div className="center-date-picker-container" onClick={this.renderDate}>
                                    <div className="center-date-picker" value="date-picker" >
                                        {this.getDate()}
                                    </div>
                                </div>
                                <div className="arrow-right-container"  onClick={this.renderDate}>
                                    <div className="arrow right" value="date-forward"></div>
                                </div>
                            </div>
                        </li>
                        <li style={{fontSize: "20px", padding: "25px"}} className="date-now" onClick={this.renderDate}>Today</li>
                    </ul>

                </nav>
                <div>
                    {this.state.menuClicked ? <MainMenu menuClickHandler={this.props.menuClickHandler} onClickHandler={this.onClickHandler}/> : null}
                </div>
                <div className="calendar-wrapper">
                    {this.state.calendarClicked ? <DateCalendar date={this.props.date} setDate={this.props.setDate} toggleCalendar={this.toggleCalendar}/> : null}
                </div>

            </div>
        )
    }
}

export default Header