import React from "react"

class ModifyReservationForm extends React.Component{

    state = {
        guest: '',
        slot: ''
    }

    componentDidMount() {
        console.log(this.props.slot.id)
        this.setState({
            slot: this.props.slot,
            guest: this.props.guest
        })
    }

    onChangeHandler = (e) => {
        if (e.target.name === "first_name") {
            let newGuest = this.state.guest
            newGuest.first_name = e.target.value

            this.setState({
                guest: newGuest
            })

        } else if (e.target.name === "last_name") {
            let newGuest = this.state.guest
            newGuest.last_name = e.target.value

            this.setState({
                guest: newGuest
            })
        } else if (e.target.name === "time") {
            let newSlot = this.state.slot
            newSlot.time = e.target.value

            this.setState({
                slot: newSlot
            })
        } else if (e.target.name === "party_size") {
            let newSlot = this.state.slot
            newSlot.party_size = e.target.value

            this.setState({
                slot: newSlot
            })
        } else if (e.target.name === "phone_number") {
            let newGuest = this.state.guest
            newGuest.phone_number = e.target.value

            this.setState({
                guest: newGuest
            })
        } else if (e.target.name === "reservation_notes") {
            let newSlot = this.state.slot
            newSlot.reservation_notes = e.target.value

            this.setState({
                slot: newSlot
            })
        } else if (e.target.name === "guest_notes") {
            let newGuest = this.state.guest
            newGuest.guest_notes = e.target.value

            this.setState({
                guest: newGuest
            })
        } else if (e.target.value === "booked") {
            let newSlot = this.state.slot
            newSlot.status = e.target.value

            this.setState({
                slot: newSlot
            })
        } else if (e.target.value === "confirmed") {
            let newSlot = this.state.slot
            newSlot.status = e.target.value

            this.setState({
                slot: newSlot
            })
        } else if (e.target.value === "left-message") {
            let newSlot = this.state.slot
            newSlot.status = e.target.value

            this.setState({
                slot: newSlot
            })
        } else if (e.target.value === "no-answer") {
            let newSlot = this.state.slot
            newSlot.status = e.target.value

            this.setState({
                slot: newSlot
            })
        } else if (e.target.value === "wrong-number") {
            let newSlot = this.state.slot
            newSlot.status = e.target.value

            this.setState({
                slot: newSlot
            })
        } else if (e.target.value === "no-show") {
            let newSlot = this.state.slot
            newSlot.status = e.target.value
            newSlot.booked = false

            this.setState({
                slot: newSlot
            })
        } else if (e.target.value === "cancelled") {
            let newSlot = this.state.slot
            newSlot.status = e.target.value
            newSlot.booked = false

            this.setState({
                slot: newSlot
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

        // if user does not select a status this ensures status set correctly in state.
        if (this.state.slot.status === '') {
            const newSlot = this.state.slot
            newSlot.status = "booked"
            newSlot.booked = true

            const newGuest = this.state.guest

            this.setState({
                slot: newSlot,
                guest: newGuest
            }, () => {
                this.patchSlot()
            })
        } else {
            this.patchSlot()
        }
    }

    patchSlot = () => {
        let slotData = {
            guest_id: this.props.guest.id,
            reservation_notes: this.state.slot.reservation_notes,
            time: this.state.slot.time,
            party_size: this.state.slot.party_size,
            booked: this.state.slot.booked,
            status: this.state.slot.status
        }

        let slotPacket = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(slotData)
        }

        fetch("http://localhost:3000/slots/" + this.props.slot.id, slotPacket)
            .then(res => res.json())
            .then(() => this.props.modifyFormSetState())
            .then(() => this.patchGuest())
    }

    patchGuest = () => {



        let guestData = {
            first_name: this.state.guest.first_name,
            last_name: this.state.guest.last_name,
            phone_number: this.state.guest.phone_number,
            guest_notes: this.state.guest.guest_notes
        }

        let guestPacket = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(guestData)
        }
        fetch("http://localhost:3000/guests/" + this.state.guest.id, guestPacket)
            .then(res => res.json())
            .then(() => this.props.updateSlots(this.state))
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
                                <input type="text" value={this.state.guest.first_name} name="first_name" placeholder="First Name" onChange={this.onChangeHandler} />
                                <input type="text" value={this.state.guest.last_name} name="last_name" placeholder="Last Name" onChange={this.onChangeHandler} />
                                <input type="text" value={this.state.guest.phone_number} name="phone_number" placeholder="Phone Number" onChange={this.onChangeHandler} />
                            </div>
                            <div>
                                <input type="text" value={this.state.slot.time} name="time" placeholder="Time" onChange={this.onChangeHandler} />
                                <input type="number" value={this.state.slot.party_size} name="party_size" placeholder="Party Size" onChange={this.onChangeHandler} />
                                <select value={this.state.slot.status} onChange={this.onChangeHandler} >
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
                                <textarea type="text" className="notes" value={this.state.slot.reservation_notes} name="reservation_notes" placeholder="Reservation Notes" onChange={this.onChangeHandler} />
                            <textarea type="text" className="notes" value={this.state.guest.guest_notes} name="guest_notes" placeholder="Guest Notes" onChange={this.onChangeHandler} />
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