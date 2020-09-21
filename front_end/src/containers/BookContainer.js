import React from 'react'
import Slot from "../cards/Slot";
import ModifyReservationForm from "../forms/ModifyReservationForm";
import NewReservationForm from "../forms/NewReservationForm";
class BookContainer extends React.Component {

    state = {
        modify_form: false,
        new_form: false,
        search_form: false,
        slot: '',
        guest: '',
    }

    checkSlotStatus = (slot) => {
        if (slot.booked === false) {
            this.setState({
                new_form: !this.state.new_form,
                slot: slot
            })
        } else {
            this.setState({
                modify_form: !this.state.modify_form,
                slot: slot
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

    renderSlots = () => {
        return this.props.slots.map(slot => <Slot key={slot.id} slot={slot} checkSlotStatus={this.checkSlotStatus} />)
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
                        key={this.state.slot.id}
                        guest={this.state.guest}
                        slot={this.state.slot}
                        modifyFormSetState={this.modifyFormSetState}
                        updateSlots={this.props.updateSlots}/> : null }
                </div>
                <div>
                    {this.state.new_form ?
                        <NewReservationForm
                            key={this.state.slot.id}
                            slot={this.state.slot}
                            newFormSetState={this.newFormSetState}
                            modifyFormSetState={this.modifyFormSetState}
                            updateGuest={this.updateGuest}
                            updateSlots={this.props.updateSlots}/> : null }
                </div>

            </div>
        )
    }

}

export default BookContainer