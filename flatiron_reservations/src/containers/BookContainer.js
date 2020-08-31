import React from 'react'
import Slot from "../cards/Slot";
import ReservationForm from "../forms/ReservationForm";

const url = "http://localhost:3000/reservations/"

class BookContainer extends React.Component {

    state = {
        reservations: [],
        reservationForm: false,
        reservationFormObj: null
    }

    componentDidMount() {
        fetch(url)
            .then(res => res.json())
            .then(reservations => this.setState({reservations: reservations}))
    }

    renderSlots = () => {
        return this.state.reservations.map(reservation => <Slot key={reservation.id} slot={reservation} onClickHandler={this.onClickHandler}/>)
    }

    onClickHandler = (obj) => {
        let reservationFormStatus = !this.state.reservationForm
        this.setState({
            reservationForm: reservationFormStatus,
            reservationFormObj: obj
        })
    }

    onSubmitHandler = (obj) => {
        const packet = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(obj)
        }

        fetch(url + obj.id, packet)
            .then(res => res.json())

        fetch(url)
            .then(res => res.json())
            .then(reservations => this.setState({reservations: reservations}))

        this.setState({
            reservationForm: false
        })
    }


    render() {
        return(
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Time</th>
                        <th>Party Size</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Status</th>
                    </tr>
                    {this.renderSlots()}
                    </tbody>
                </table>

                <div>
                    {this.state.reservationForm ? <ReservationForm
                        key={this.state.reservationFormObj.id}
                        reservation={this.state.reservationFormObj}
                        onSubmitHandler={this.onSubmitHandler} /> : null }
                </div>

            </div>
        )
    }

}

export default BookContainer