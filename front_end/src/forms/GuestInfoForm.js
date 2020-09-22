import React from 'react'
import GuestHistoryItem from "../cards/GuestHistoryItem";
import "../stylesheets/GuestInfoForm.css"

class GuestInfoForm extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        phone_number: '',
        guest_notes: '',
        slots: [],
    }


    componentDidMount() {
        this.setState({
            first_name: this.props.guest.first_name,
            last_name: this.props.guest.last_name,
            phone_number: this.props.guest.phone_number,
            guest_notes: this.props.guest.guest_notes,
            slots: this.props.guest.slots
        })
    }

    onChangeHandler = (e) => {
        if (e.target.name === "first_name"){
            this.setState({
                first_name: e.target.value
            })
        } else if (e.target.name === "last_name"){
            this.setState({
                last_name: e.target.value
            })
        } else if (e.target.name === "phone_number"){
            this.setState({
                phone_number: e.target.value
            })
        } else if (e.target.name === "guest_notes"){
            this.setState({
                guest_notes: e.target.value
            })
        }
    }

    renderGuestHistory = () => {
        return this.state.slots.map(slot => <GuestHistoryItem key={slot.id} slot={slot}/>)
    }

    render(){

        return(
            <div className='guest-info-container'>

                <form>
                    <div>
                        <h3>Guest Information</h3>
                        <input type="text" name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.onChangeHandler}></input>
                        <input type="text" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.onChangeHandler}></input>
                        <input type="text" name="phone_number" placeholder="Phone Number" value={this.state.phone_number} onChange={this.onChangeHandler}></input>
                    </div>
                    <div>
                        <textarea type="text" name="guest_notes" placeholder="Guest Notes" value={this.state.guest_notes} onChange={this.onChangeHandler}></textarea>
                    </div>

                    <div className="guest-history-item-container">
                        <h3>Guest History</h3>
                        {this.renderGuestHistory()}
                    </div>

                </form>



            </div>
        )
    }
}

export default GuestInfoForm