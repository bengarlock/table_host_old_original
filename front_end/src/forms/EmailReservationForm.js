import React from 'react'
import "../stylesheets/EmailReservationForm.css"
class EmailReservationForm extends React.Component{


    state = {
        book: '',
    }

    componentDidMount() {
        let packet = {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            }
        }

        fetch(this.props.backendUrl + "/books/" + this.props.slot.book + '/', packet)
            .then(res => res.json())
            .then(book => this.setState({
                book: book
            }))
    }


    renderDateWording = () =>{
        const reservationDate = new Date(this.state.book.date)
        let trailer = () => {
            if (reservationDate.getDate() + 1 === 1) {
                return "st"
            } else if (reservationDate.getDate() + 1 === 2) {
                return 'nd'
            } else if (reservationDate.getDate() + 1 === 3) {
                return 'rd'
            } else {
                return 'th'
            }
        }


        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const monthsOfYear = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
        return (
            daysOfWeek[reservationDate.getDay()] + ', ' +
            monthsOfYear[reservationDate.getMonth()] + " " +
            (reservationDate.getDate() + 1) + trailer())
    }

    onClickHandler = (e) => {
        if (e.target.id === "close"){
            this.props.emailFormState()
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        let slotRow = document.getElementById(`${this.props.slot.id}`)
        slotRow.setAttribute("style", `background-color: #c8b819`)
        slotRow.setAttribute("class", `last-reservation`)
        this.props.emailFormState()
    }

    render(){
        return(
            <div id="email-wrapper">
                <div id="email-overlay">
                    <div id="email-form-container" >
                        <form className="email-form" onSubmit={this.onSubmitHandler} style={{cursor: "default"}}>
                            <div>
                                <div id="close" onClick={this.onClickHandler}>Close</div>
                                <h2 style={{padding: "10px"}}>Reservation Confirmation</h2>
                                <div style={{padding: "10px", fontWeight: "900"}}>
                                    Reservation has been confirmed for:
                                </div>
                                <div>{this.props.guest.first_name} {this.props.guest.last_name}</div>
                                <div>{this.renderDateWording()}</div>
                                <div>for {this.props.slot.party_size} people</div>
                                <div>at {this.props.slot.time}</div>
                                <br />
                                <div>Would you like a confirmation email?</div>

                                <input style={{width: "300px"}}
                                       type="text" name="email"
                                       placeholder="Email"
                                       autoComplete="off" />
                            </div>
                            <input style={{backgroundColor: "#486998", color: "white"}} type="submit" value="Send Email"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmailReservationForm