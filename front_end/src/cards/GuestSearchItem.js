import React from 'react'
import "../stylesheets/GuestContainer.css"

class GuestSearchItem extends React.Component{

    guestSelected = () => {
        this.props.updateCurrentGuest(this.props.result)
    }

    render() {
        return(
            <div className="search-result-item" onClick={this.guestSelected}>
                {this.props.result.first_name} {this.props.result.last_name}
            </div>
        )
    }
}

export default GuestSearchItem