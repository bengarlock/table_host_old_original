import React from 'react'
import Slot from "../cards/Slot";
import ModifyReservationForm from "../forms/ModifyReservationForm";
import NewReservationForm from "../forms/NewReservationForm";
class BookContainer extends React.Component {

    state = {
        modify_form: false,
        new_form: false,
        current_slot: '',
    }

    fetchSlotInfo = (slot) => {
        fetch("http://localhost:3000/slots/" + slot.id)
            .then(res => res.json())
            .then(slot => this.checkSlotStatus(slot))
    }

    checkSlotStatus = (slot) => {
        if (slot.guest === null) {
            this.setState({
                slot: slot,
                new_form: !this.state.new_form
            })
        } else {
            this.setState({
                slot: slot,
                modify_form: !this.state.modify_form
            })
        }
    }


    renderSlots = () => {
        return this.props.slots.map(slot => <Slot key={slot.id} slot={slot} fetchSlotInfo={this.fetchSlotInfo}/>)
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
                        key={this.state.reservationFormObj.id}
                        reservation={this.state.reservationFormObj}
                        onClickHandler={this.onClickHandler}
                        onSubmitHandler={this.onSubmitHandler} /> : null }
                </div>
                <div>
                    {this.state.new_form ? <NewReservationForm
                        key={this.state.current_slot.id} slot={this.state.current_slot}/> : null }
                </div>

            </div>
        )
    }

}

export default BookContainer