import React from 'react'
import Slot from "../cards/Slot";
import ModifyReservationForm from "../forms/ModifyReservationForm";
import NewReservationForm from "../forms/NewReservationForm";
import EmailReservationForm from "../forms/EmailReservationForm";
import "../stylesheets/BookContainer.css"


class BookContainer extends React.Component {

    state = {
        modify_form: false,
        new_form: false,
        search_form: false,
        email_form: false,
        slot: '',
        guest: '',
    }

    checkSlotStatus = (slot, guest=null) => {
        if (slot.booked === false) {
            this.setState({
                new_form: !this.state.new_form,
                slot: slot,
                guest: guest
            })
        } else {
            this.setState({
                modify_form: !this.state.modify_form,
                slot: slot,
                guest: guest
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

    emailFormSetState = () => {
        this.setState({
            email_form: !this.state.email_form
        })
    }

    updateGuest = (guest, slot) => {
        //takes guest and slot info from search item and merges.  Passes back down to modifyreservation form.

        this.setState({
            guest: guest,
            slot: slot,
            modify_form: !this.state.modify_form,
            new_form: !this.state.new_form
        })
    }

    renderSlots = () => {
        console.log(this.props.slots.length)
        if (this.props.slots.length > 0) {
            return this.props.slots.map(slot => <Slot key={slot.id} slot={slot} checkSlotStatus={this.checkSlotStatus} />)
        } else {
            return (
                <div className="closed-message-wrapper">
                    <div className={"closed-message"}>The Restaurant is closed on this day</div>
                </div>)
        }

    }


    render() {
        return(
            <div className="book-container-wrapper">
                <table style={{fontWeight: "bold"}}>
                    <tbody className="book-container-wrapper">
                    <tr className="header-title-bar">
                        <th style={{textAlign: "center"}}>Time</th>
                        <th style={{textAlign: "center"}}>Size</th>
                        <th style={{textAlign: "center"}}>First Name</th>
                        <th style={{textAlign: "center"}}>Last Name</th>
                        <th style={{textAlign: "center"}}>Phone Number</th>
                        <th style={{textAlign: "center"}}>Reservation Notes</th>
                        <th style={{textAlign: "center"}}>Guest Notes</th>
                        <th style={{textAlign: "center"}}>Status</th>
                    </tr>
                        {this.renderSlots()}
                    </tbody>
                </table>

                <div>
                    {this.state.modify_form ? <ModifyReservationForm
                        key={this.state.slot.id}
                        slot={this.state.slot}
                        guest={this.state.guest}
                        modifyFormSetState={this.modifyFormSetState}
                        updateSlots={this.props.updateSlots}
                        emailFormState = {this.emailFormSetState}/> : null }
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
                <div>
                    {this.state.email_form ?
                        <EmailReservationForm
                            key={this.state.slot.id}
                            slot={this.state.slot}
                            guest={this.state.guest}
                            emailFormState={this.emailFormSetState}/> : null}
                </div>

            </div>
        )
    }

}

export default BookContainer