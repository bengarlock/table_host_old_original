import React from "react"

class ReservationForm extends React.Component{

    state = {
        id: this.props.reservation.id,
        booked: this.props.reservation.booked,
        first_name: this.props.reservation.first_name,
        last_name: this.props.reservation.last_name,
        time: this.props.reservation.time,
        party_size: this.props.reservation.party_size,
        phone_number: this.props.reservation.phone_number,
        reservation_notes: this.props.reservation.reservation_notes,
        guest_notes: this.props.reservation.guest_notes,
        status: this.props.reservation.status
    }

    onChangeHandler = (e) => {

        if (e.target.name === "first_name") {
            this.setState({
                first_name: e.target.value
            })
        } else if (e.target.name === "last_name") {
            this.setState({
                last_name: e.target.value
            })
        } else if (e.target.name === "time") {
            this.setState({
                time: e.target.value
            })
        } else if (e.target.name === "party_size") {
            this.setState({
                party_size: e.target.value
            })
        } else if (e.target.name === "phone_number") {
            this.setState({
                phone_number: e.target.value
            })
        } else if (e.target.name === "reservation_notes") {
            this.setState({
                reservation_notes: e.target.value
            })
        } else if (e.target.name === "reservation_notes") {
            this.setState({
                reservation_notes: e.target.value
            })
        } else if (e.target.name === "guest_notes") {
            this.setState({
                guest_notes: e.target.value
            })
        } else if (e.target.value === "booked") {
            this.setState({
                status: e.target.value,
                booked: true
            })
        } else if (e.target.value === "confirmed") {
            this.setState({
                status: e.target.value,
                booked: true
            })
        } else if (e.target.value === "left-message") {
            this.setState({
                status: e.target.value,
                booked: true
            })
        } else if (e.target.value === "no-answer") {
            this.setState({
                status: e.target.value,
                booked: true
            })
        } else if (e.target.value === "wrong-number") {
            this.setState({
                status: e.target.value,
                booked: true
            })
        } else if (e.target.value === "no-show") {
            this.setState({
                status: e.target.value,
                booked: false
            })
        } else if (e.target.value === "cancelled") {
            this.setState({
                status: e.target.value,
                booked: false
            })
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        this.props.onSubmitHandler(this.state)
    }

    render(){
        return(
            <div id="wrapper">
                <div id="overlay">
                    <div id="reservation-form-container" >
                        <form className="reservation-form" onSubmit={this.onSubmitHandler} style={{cursor: "default"}}>
                            <div>
                                <div id="close" onClick={this.props.onClickHandler}>Close</div>
                                <h2>Reservation Form</h2>
                                <input type="text" value={this.state.first_name} name="first_name" placeholder="First Name" onChange={this.onChangeHandler} />
                                <input type="text" value={this.state.last_name} name="last_name" placeholder="Last Name" onChange={this.onChangeHandler} />
                                <input type="text" value={this.state.phone_number} name="phone_number" placeholder="Phone Number" onChange={this.onChangeHandler} />
                            </div>
                            <div>
                                <input type="text" value={this.state.time} name="time" placeholder="Time" onChange={this.onChangeHandler} />
                                <input type="number" value={this.state.party_size} name="party_size" placeholder="Party Size" onChange={this.onChangeHandler} />
                                <select value={this.state.status} onChange={this.onChangeHandler} >
                                    <option value="booked">Booked</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="left-message">Left Message</option>
                                    <option value="no-answer">No Answer</option>
                                    <option value="wrong-number">Wrong Number</option>
                                    <option value="no-show">No-Show</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                                <label value="Reservation Notes"></label>
                                <textarea type="text" className="notes" value={this.state.reservation_notes} name="reservation_notes" placeholder="Reservation Notes" onChange={this.onChangeHandler} />
                            <textarea type="text" className="notes" value={this.state.guest_notes} name="guest_notes" placeholder="Guest Notes" onChange={this.onChangeHandler} />
                            <div>
                                <input style={{backgroundColor: "#486998"}} type="submit" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReservationForm