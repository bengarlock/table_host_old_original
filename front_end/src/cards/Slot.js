import React from "react";

class Slot extends React.Component {

    onClickHandler = () => {
        this.props.checkSlotStatus(this.props.slot)
    }

    render(){
        return(
            <tr onDoubleClick={this.onClickHandler} dataset={this.props.slot.id}>
                <td>{this.props.slot.time}</td>
                <td>{this.props.slot.party_size}</td>
                <td>{this.props.slot.guest.first_name}</td>
                <td>{this.props.slot.guest.last_name}</td>
                <td>{this.props.slot.guest.phone_number}</td>
                <td>{this.props.slot.status}</td>
            </tr>
        )
    }
}

export default Slot