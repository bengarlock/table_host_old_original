import React from "react"
import "../stylesheets/SearchItem.css"

class SearchItems extends React.Component {

    guestSelected = () => {
        //updates state with new guest id in book container.
        this.props.updateGuest(this.props.result, this.props.slot)
    }

    render() {
        return(
            <div className="search-results-container" onClick={this.guestSelected}>
                <span>{this.props.result.first_name} {this.props.result.last_name}</span>
            </div>
        )
    }

}

export default SearchItems