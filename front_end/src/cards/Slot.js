import React from "react";
import "../stylesheets/Slot.css"

class Slot extends React.Component {

    state = {
        color: '',
        textColor: 'black'
    }

    componentDidMount() {
        this.renderColors()
    }

    renderColors = () => {
        if (this.props.slot.status === "seated"){
            this.setState({
                color: "#547CA5",
                textColor: "black"
            })
        } else if (this.props.slot.status === "booked" ||
            this.props.slot.status === "no-answer" ||
            this.props.slot.status === "left-message" ||
            this.props.slot.status === "wrong-number"
        ){
            this.setState({
                color: "#c8b819",
                textColor: "black"
            })
        } else if (this.props.slot.status === "appetizer") {
            this.setState({
                color: "#b05353",
                textColor: "black"
            })
        } else if (this.props.slot.status === "dessert") {
            this.setState({
                color: "#745bab",
                textColor: "black"
            })

        } else if (this.props.slot.status === "no-show") {
            this.setState({
                color: "red",
                textColor: "black"
            })

        }  else if (this.props.slot.status === "done") {
            this.setState({
                color: "#7c7c7c",
                textColor: "black"
            })
        }  else if (this.props.slot.status === 'cancelled') {
            this.setState({
                color: "white",
                textColor: "black"
            })
        }  else if (this.props.slot.status === 'check_dropped') {
            this.setState({
                color: "#599236",
                textColor: "black"
            })
        }  else if (this.props.slot.status === 'paid') {
            this.setState({
                color: "#3d6622",
                textColor: "black"
            })
        }    else if (this.props.slot.status === '') {
            this.setState({
                color: "white",
                textColor: "black"
            })
        }
    }

    onMouseOver = (e) => {
        this.setState({
            color: "#adcae3",
            texColor: "#fff"
        })
    }

    onMouseLeave = () => {
        this.renderColors()
    }

    onClickHandler = () => {
        this.props.checkSlotStatus(this.props.slot, this.props.slot.guest)
    }

    render(){
        return(
            <tr
                onDoubleClick={this.onClickHandler}
                id={this.props.slot.id}
                style={{backgroundColor: this.state.color, userSelect: "none"}}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}>

                <td id="time" style={{color: this.state.textColor}}>{this.props.slot.time}</td>
                <td id="party-size" style={{color: this.state.textColor}}>{this.props.slot.party_size}</td>
                <td id="first-name">{this.props.slot.guest.first_name}</td>
                <td id="last-name">{this.props.slot.guest.last_name}</td>
                <td id="phone-number">{this.props.slot.guest.phone_number}</td>
                <td id='reservation-notes'>{this.props.slot.reservation_notes}</td>
                <td id='guest-notes'>{this.props.slot.guest.guest_notes}</td>
                <td id='status'>{this.props.slot.status}</td>
            </tr>
        )
    }
}

export default Slot