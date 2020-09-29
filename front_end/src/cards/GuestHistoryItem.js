import React from 'react'
import "../stylesheets/GuestInfoForm.css"

class GuestHistoryItem extends React.Component {

    processDate = (date) => {
        const updatedDate = date.split('-')
        const year = updatedDate[0]
        const month = updatedDate[1]
        const day = updatedDate[2]
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return `${months[month - 1]}-${day}-${year}`
    }

    render(){

        return(
            <tr className="guest-history-item">
                <td>
                    {this.processDate(this.props.slot.book.date)}
                </td>
                <td>
                    {this.props.slot.time}
                </td>
                <td>
                    {this.props.slot.party_size}
                </td>
                <td>
                    {this.props.slot.status}
                </td>
            </tr>
        )
    }
}

export default GuestHistoryItem