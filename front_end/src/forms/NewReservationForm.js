import React from "react"
import "../stylesheets/NewReservationForm.css"
import SearchItems from "../cards/SearchItems";

class NewReservationForm extends React.Component {

    state = {
        search: '',
        searchResults: []
    }

    onChangeHandler = (e) => {
        if (e.target.name === "search") {
            this.setState({
                search: e.target.value
            })
            fetch("http://www.bengarlock.com:8080/guests/?search=" + e.target.value)
                .then(res => res.json())
                .then(results => this.setState({
                    searchResults: results
                }))
        }
    }

    onSubmitHandler = () => {
        console.log("submit")
    }

    renderSearchResults = () => {
        return this.state.searchResults.map(result => <SearchItems
            key={result.id} result={result}
            newFormSetState={this.props.newFormSetState}
            modifyFormSetState={this.props.modifyFormSetState}
            updateGuest={this.props.updateGuest}
            slot={this.props.slot}/>)
    }

    render(){
        return(
            <div id="wrapper">
                <div id="overlay">
                    <div id="reservation-form-container" >
                        <form className="reservation-form" onSubmit={this.onSubmitHandler} >
                            <div>
                                <div id="close" onClick={this.props.newFormSetState}>Close</div>
                                <h2>Search For Guest</h2>
                                <div className="search-box">
                                    <input  type="text" value={this.state.search} name="search" placeholder="Guest Search"  autoComplete="off" onChange={this.onChangeHandler} />
                                </div>
                            </div>
                            <div>
                                {this.renderSearchResults()}
                            </div>
                            {/*<div className="submit-button">
                                <input style={{backgroundColor: "#486998", width: "150px" }} type="submit" />
                            </div>*/}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewReservationForm