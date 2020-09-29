import React from 'react'
import "../stylesheets/EmailReservationForm.css"
class EmailReservationForm extends React.Component{


    renderDateWording = () =>{
        const reservationDate = new Date(this.props.slot.book.date)
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const monthsOfYear = ["January", "February", "Mark", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return daysOfWeek[reservationDate.getDay()] + ', ' + monthsOfYear[reservationDate.getMonth()] + " " + reservationDate.getDate()

    }

    onClickHandler = (e) => {
        if (e.target.id === "close"){
            this.props.emailFormState()
        }
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
                                <div style={{padding: "10px", fontWeight: "900"}}>Reservation has been confirmed for: </div>
                                <div>{this.props.guest.first_name} {this.props.guest.last_name}</div>
                                <div>{this.renderDateWording()}</div>
                                <div>for {this.props.slot.party_size} people</div>
                                <div>at {this.props.slot.time}</div>
                                <br />
                                <div>Would you like a confirmation email?</div>

                                <input style={{width: "300px"}} type="text" name="email" placeholder="Email" />
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