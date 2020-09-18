import React from "react";

class Slot extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        phone_number: '',
    }


    onClickHandler = () => {
        this.props.fetchSlotInfo(this.props.slot)
    }




    render(){
        return(
            <tr onDoubleClick={this.onClickHandler} data-slotid={this.props.slot.id}>
                <td>{this.props.slot.time}</td>
                <td>{this.props.slot.party_size}</td>
                <td>{this.state.first_name}</td>
                <td>{this.state.last_name}</td>
                <td>{this.state.phone_number}</td>
                <td>{this.props.slot.status}</td>
            </tr>
        )
    }
}

export default Slot