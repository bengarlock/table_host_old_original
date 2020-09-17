import React from 'react'
import Slot from "../cards/Slot";
import ReservationForm from "../forms/ReservationForm";

class BookContainer extends React.Component {

    state = {
        slots: [],
        reservationForm: false,
        reservationFormObj: null
    }

    componentDidMount() {
        let date = this.props.date
        let url = "http://localhost:3000/date?date=" + (date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))
        fetch(url)
            .then(res => res.json())
            .then(book => this.setState({slots: book[0].slots}))
    }

    onClickHandler = (obj) => {
        let reservationFormStatus = !this.state.reservationForm
        this.setState({
            reservationForm: reservationFormStatus,
            reservationFormObj: obj
        })
    }

    renderSlots = () => {
        return this.state.slots.map(slot => <Slot key={slot.id} slot={slot} onClickHandler={this.onClickHandler}/>)
    }

    /*onSubmitHandler = (obj) => {
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
    }*/


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
                        onClickHandler={this.onClickHandler}
                        onSubmitHandler={this.onSubmitHandler} /> : null }
                </div>

            </div>
        )
    }

}

export default BookContainer