import React from 'react'
import "../stylesheets/GuestInfoForm.css"

class GuestHistoryItem extends React.Component {

    processDate = (date) => {
        const updatedDate = date.split('-')
        const year = updatedDate[0]
        const month = updatedDate[1]
        const day = updatedDate[2]
        return `${month}-${day}-${year}`
    }

    render(){

        return(

                <div className="guest-history-item">
                    <span type="text">{this.processDate(this.props.slot.book.date)}</span>
                    <span>{this.props.slot.time}</span>
                    <span>{this.props.slot.party_size} People</span>
                    <span>{this.props.slot.status}</span>
                </div>

        )
    }
}

export default GuestHistoryItem