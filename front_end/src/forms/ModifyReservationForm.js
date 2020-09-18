import React from "react"

class ModifyReservationForm extends React.Component{

    state = {
        guest_id: this.props.guest.id,
        first_name: this.props.guest.first_name,
        last_name: this.props.guest.last_name,
        phone_number: this.props.guest.phone_number,
        guest_notes: this.props.guest.guest_notes,

        slot_id: this.props.current_slot.id,
        reservation_notes: this.props.current_slot.reservation_notes,
        status: this.props.current_slot.status,
        time: this.props.current_slot.time,
        party_size: this.props.current_slot.party_size,
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

    onClickHandler = (e) => {
        if (e.target.id === "close") {
            this.props.modifyFormSetState()
        }
    }


    onSubmitHandler = (e) => {
        e.preventDefault()

        //update slot with guest_id
        let data = {
            guest_id: this.state.guest_id
        }

        let packet = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(data)
        }

        fetch("http://localhost:3000/slots/" + this.state.slot_id, packet)
            .then(res => res.json())
            .then(console.log)
    }

    render(){
        console.log("GuestID: ", this.state.guest_id)
        console.log("SlotID: ", this.state.slot_id)
        return(
            <div id="wrapper">
                <div id="overlay">
                    <div id="reservation-form-container" >
                        <form className="reservation-form" onSubmit={this.onSubmitHandler} style={{cursor: "default"}}>
                            <div>
                                <div id="close" onClick={this.onClickHandler}>Close</div>
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

export default ModifyReservationForm