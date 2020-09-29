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
        let menuClicked = !this.state.menuClicked
        this.setState({
            menuClicked: menuClicked
        })
    }

    //triggered on user clicking calendar buttons
    renderDate = (e) => {
        if (e.target.className === "arrow right") {
            this.props.date.setDate(this.props.date.getDate() + 1)
            this.props.setDate(this.props.date)

        } else if (e.target.className === "arrow left") {
            this.props.date.setDate(this.props.date.getDate() - 1)
            this.props.setDate(this.props.date)



        } else if (e.target.className === "date-picker") {
            this.setState({
                calendarClicked: !this.state.calendarClicked
            })

        } else if (e.target.className === "date-now") {
            let date = new Date()
            this.props.setDate(date)
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
            <div className="navigation-header">
            <nav>
                <ul className="main-header">
                    <li className="main-menu-button-container" onClick={this.onClickHandler}>
                        <div>
                            <div id="main-menu-button"></div>
                            <div id="main-menu-button"></div>
                            <div id="main-menu-button"></div>
                        </div>

                    </li>
                    <li className="arrow left" value="date-back" onClick={this.renderDate}></li>
                    <li className="date-picker-container">
                     {/*       <span ></span>*/}
                            <span className="center-date-picker" value="date-picker" onClick={this.renderDate}>
                                {this.getDate()}
                                {this.state.calendarClicked ? <DateCalendar date={this.props.date} setDate={this.props.setDate} toggleCalendar={this.toggleCalendar}/> : null}
                            </span>
                        <li className="arrow right" value="date-forward" onClick={this.renderDate}></li>
                    </li>
                    <li style={{fontSize: "20px", padding: "25px"}} className="date-now" onClick={this.renderDate}>Today</li>
                </ul>
                <div>{this.state.menuClicked ? <MainMenu menuClickHandler={this.props.menuClickHandler} onClickHandler={this.onClickHandler}/> : null}</div>
            </nav>
            </div>
        )
    }

}

export default Header