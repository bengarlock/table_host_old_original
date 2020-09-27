import React from 'react'
import CoverCount from "../Reports/CoverCount";
import PrintReservations from "../Reports/PrintReservations";
import "../stylesheets/ReportsContainer.css"

class ReportsContainer extends React.Component {

    state = {
        report: 'cover_count'
    }

    //I really need to find a better way... maybe an overlaying div??
    onClickHandler = (e) => {
        if (e.target.className === "cover-count-nav-icon"
            || e.target.id === "cover-count-nav-icon-1"
            || e.target.id === "cover-count-nav-icon-2"
            || e.target.id === "cover-count-nav-icon-3") {
            this.setState({
                report: "cover_count"
            })
        } else if (e.target.className === "print-reservations-nav-icon"
            || e.target.id === "print-reservations-nav-icon-1"
            || e.target.id === "print-reservations-nav-icon-1-1"
            || e.target.id === "print-reservations-nav-icon-1-2"

            || e.target.id === "print-reservations-nav-icon-2"
            || e.target.id === "print-reservations-nav-icon-2-1"
            || e.target.id === "print-reservations-nav-icon-2-2"

            || e.target.id === "print-reservations-nav-icon-3"
            || e.target.id === "print-reservations-nav-icon-3-1"
            || e.target.id === "print-reservations-nav-icon-3-2")

            this.setState({
                report: "print_reservations"
            })
    }

    render() {
        return (
            <div className="report-container">
                <div className="reports-nav">
                    <div className="cover-count-nav-icon" onClick={this.onClickHandler}>
                        <div id="cover-count-nav-icon-1"></div>
                        <div id="cover-count-nav-icon-2"></div>
                        <div id="cover-count-nav-icon-3"></div>
                    </div>
                    <div className="print-reservations-nav-icon" onClick={this.onClickHandler}>
                        <div id="print-reservations-nav-icon-1">
                            <div id="print-reservations-nav-icon-1-1"></div><div id="print-reservations-nav-icon-1-2"></div>
                        </div>
                        <div id="print-reservations-nav-icon-2">
                            <div id="print-reservations-nav-icon-2-1"></div><div id="print-reservations-nav-icon-2-2"></div>
                        </div>
                        <div id="print-reservations-nav-icon-3">
                            <div id="print-reservations-nav-icon-3-1"></div><div id="print-reservations-nav-icon-3-2"></div>
                        </div>
                    </div>
                </div>
                <div className="report-content">
                    {this.state.report === "cover_count" ? <CoverCount slots={this.props.slots} date={this.props.date}/> : null}
                    {this.state.report === "print_reservations" ? <PrintReservations /> : null}
                </div>
            </div>
        )
    }
}

export default ReportsContainer
