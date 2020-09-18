import React from "react"

class SearchItems extends React.Component {

    guestSelected = () => {
        this.props.updateGuest(this.props.result)
        this.props.newFormSetState()
        this.props.modifyFormSetState()
    }

    render() {
        return(
            <div className="search-results-container">
                <span onClick={this.guestSelected}>{this.props.result.first_name} {this.props.result.last_name}</span>
            </div>
        )
    }

}

export default SearchItems