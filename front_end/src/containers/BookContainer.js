import React from 'react'
import Slot from "../cards/Slot";
import ModifyReservationForm from "../forms/ModifyReservationForm";
import NewReservationForm from "../forms/NewReservationForm";
class BookContainer extends React.Component {

    state = {
        modify_form: false,
        new_form: false,
        search_form: false,
        current_slot: '',
        guest: '',
    }

    fetchSlotInfo = (slot) => {
        this.setState({
            current_slot: slot
        })
        fetch("http://localhost:3000/slots/" + slot.id)
            .then(res => res.json())
            .then(slot => this.checkSlotStatus(slot))
    }

    checkSlotStatus = (slot) => {
        if (slot.booked === false) {
            this.setState({
                new_form: !this.state.new_form
            })
        } else {
            this.setState({
                modify_form: !this.state.modify_form
            })
        }
    }

    newFormSetState = () => {
        this.setState({
            new_form: !this.state.new_form
        })
    }

    modifyFormSetState = () => {
        this.setState({
            modify_form: !this.state.modify_form
        })
    }

    updateGuest = (guest) => {
        this.setState({
            guest: guest
        })
    }

    renderGuest = (id) => {
        fetch("http://localhost:3000/guests/" + id)
            .then(res => res.json())
            .then(guest => this.setState ({
                first_name: guest.first_name,
                last_name: guest.last_name,
                phone_number: guest.phone_number
            }))
    }


    renderSlots = () => {
        return this.props.slots.map(slot => <Slot key={slot.id} slot={slot} fetchSlotInfo={this.fetchSlotInfo} />)
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
                    {this.state.modify_form ? <ModifyReservationForm
                        key={this.state.current_slot.id}
                        guest={this.state.guest}
                        current_slot={this.state.current_slot}
                        modifyFormSetState={this.modifyFormSetState}/> : null }
                </div>
                <div>
                    {this.state.new_form ?
                        <NewReservationForm
                            key={this.state.current_slot.id}
                            slot={this.state.current_slot}
                            newFormSetState={this.newFormSetState}
                            modifyFormSetState={this.modifyFormSetState}
                            updateGuest={this.updateGuest}/> : null }
                </div>

            </div>
        )
    }

}

export default BookContainer