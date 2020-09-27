import React from 'react'
import ReportCoverCountCard from "../cards/ReportCoverCountCard";
import ReservationInfo from "../forms/ReservationInfo";
import "../stylesheets/CoverCount.css"

class CoverCount extends React.Component {

    state = {
        reservation: ''
    }

    proccessReservationNumbers = () => {
        const reservations = []
        this.props.slots.forEach( item => {

            let newObject = {}
            newObject.id = item.id
            newObject.time = item.time
            newObject.total_booked = this.props.slots.filter(slot => slot.time === item.time && slot.booked === true).length
            newObject.resos = this.props.slots.filter(slot => slot.time === item.time && slot.booked === true)

            reservations.push(newObject)
        })

        const cleanedReservations = Array.from(new Set(reservations.map(item => item.time))).map(time => {return reservations.find(a => a.time === time)})
        return cleanedReservations
    }

    renderCoverCount = () => {
        const reservations = this.proccessReservationNumbers()
        return reservations.map(reservation => <ReportCoverCountCard key={reservation.id} reservation={reservation} renderGuestInfo={this.renderGuestInfo}/>)
    }

    renderGuestInfo = (reservation) => {
        this.setState({
            reservation: reservation
        })
    }

    renderTotalCovers = () => {
        const reservations = this.proccessReservationNumbers()
        let total = 0
        reservations.forEach(reservation => total = total + reservation.total_booked)
        return total
    }

    render() {
        return(
            <div className="page-container">
                <div className="cover-count-container">
                    <h3>Reservation Cover Count</h3>
                    <div className="total-covers">Total Covers: {this.renderTotalCovers()}</div>
                    <div className="span-container">
                        {this.renderCoverCount()}
                    </div>
                </div>
                <div className="cover-count-guest-container">
                    <h3>Guest Information</h3>
                    {this.state.reservation.guest ? <ReservationInfo key={this.state.reservation.id} reservation={this.state.reservation}/> : null}
                </div>
            </div>
        )
    }
}

export default CoverCount