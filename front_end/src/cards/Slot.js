import React from "react";

class Slot extends React.Component {

    onClickHandler = () => {
        this.props.fetchSlotInfo(this.props.slot)
    }


    render(){
        return(
            <tr onDoubleClick={this.onClickHandler} data-slotid={this.props.slot.id}>
                <td>{this.props.slot.time}</td>
                <td>{this.props.slot.party_size}</td>
                <td>{this.props.slot.first_name}</td>
                <td>{this.props.slot.last_name}</td>
                <td>{this.props.slot.phone_number}</td>
                <td>{this.props.slot.status}</td>
            </tr>
        )
    }
}

export default Slot