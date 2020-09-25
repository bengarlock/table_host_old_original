import React from "react"

class ModifyReservationForm extends React.Component{

    state = {
        guest_id: this.props.slot.guest.id,
        first_name: this.props.slot.guest.first_name,
        last_name: this.props.slot.guest.last_name,
        phone_number: this.props.slot.guest.phone_number,
        guest_notes: this.props.slot.guest.guest_notes,

        slot_id: this.props.slot.id,
        booked: this.props.slot.booked,
        reservation_notes: this.props.slot.reservation_notes,
        status: this.props.slot.status,
        time: this.props.slot.time,
        party_size: this.props.slot.party_size,
    }

    componentDidMount() {
        if (this.state.status === '') {
            this.setState({
                status: 'booked'
            })
        }

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
        this.patchSlot()
        this.patchGuest()
    }

    patchSlot = () => {
        console.log("the current status of this slot is: ", this.props.slot.status)
        let slotData = {
            guest_id: this.props.guest.id,
            reservation_notes: this.state.reservation_notes,
            time: this.state.time,
            party_size: this.state.party_size,
            booked: true,
            status: this.props.slot.status
        }

        let slotPacket = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(slotData)
        }

        fetch("http://localhost:3000/slots/" + this.state.slot_id, slotPacket)
            .then(res => res.json())
            .then(() => this.props.modifyFormSetState())
            .then(() => this.props.updateSlots(this.state))
    }

    patchGuest = () => {

        let guestData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone_number: this.state.phone_number,
            guest_notes: this.state.guest_notes
        }

        let guestPacket = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(guestData)
        }

        fetch("http://localhost:3000/guests/" + this.props.guest.id, guestPacket)
            .then(res => res.json())

    }


    render(){
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