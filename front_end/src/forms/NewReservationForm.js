import React from "react"
import "../stylesheets/NewReservationForm.css"
import SearchItems from "../cards/SearchItems";
import NewGuestForm from "./NewGuestForm";

class NewReservationForm extends React.Component {

    state = {
        search: '',
        searchResults: [],
        render_new_guest_form: false
    }

    onChangeHandler = (e) => {
        if (e.target.name === "search") {
            this.setState({
                search: e.target.value
            })
            fetch(this.props.backendUrl + "/guests/?search=" + e.target.value)
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

    toggleNewGuestForm = () => {
        this.setState({
            render_new_guest_form: !this.state.render_new_guest_form
        })
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
                                    <input  type="text"
                                            value={this.state.search}
                                            name="search"
                                            placeholder="Guest Search"
                                            autoComplete="off"
                                            onChange={this.onChangeHandler} />
                                </div>
                            </div>
                            <div>
                                {this.renderSearchResults()}
                            </div>
                        </form>

                        <div className="new-guest-form">
                                {this.state.render_new_guest_form ? <NewGuestForm
                                    search_data={this.state.search}
                                    updateGuest={this.props.updateGuest}
                                    slot={this.props.slot}
                                    modifyFormSetState={this.props.modifyFormSetState}
                                    backendUrl={this.props.backendUrl}/> : null}

                            </div>
                            <div className="reservation-form" onClick={this.toggleNewGuestForm}>
                                {this.state.render_new_guest_form ? null : <input
                                    style={{backgroundColor: "#486998", width: "150px" }}
                                    value="Create Guest"
                                    type="button" />}
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewReservationForm