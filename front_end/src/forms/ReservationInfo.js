import React from 'react'

class ReservationInfo extends React.Component{

    render() {
        return(
            <div>
                <div className="guest-info-header" style={{fontWeight: "900"}}>
                    <span>
                        Name:
                        {this.props.reservation.guest.first_name}
                        {this.props.reservation.guest.last_name}
                    </span>
                </div>
                <div className="guest-info-header">
                    <span>Time: {this.props.reservation.time}</span>
                </div>
                <div className="guest-info-header">
                    <span>
                        Reservation Notes:
                        {this.props.reservation.reservation_notes ? this.props.reservation.reservation_notes : "None" }
                    </span>
                </div>
                <div className="guest-info-header">
                    <span>
                        Guest Notes:
                        {this.props.reservation.guest.guest_notes ? this.props.reservation.guest.guest_notes : "None" }
                    </span>
                </div>
            </div>
        )
    }
}
export default ReservationInfo