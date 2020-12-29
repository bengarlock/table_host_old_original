import React from "react"
import "../stylesheets/GuestContainer.css"
import GuestSearchItem from "../cards/GuestSearchItem";
import GuestInfoForm from "../forms/GuestInfoForm";

class GuestContainer extends React.Component{

    state = {
        search: '',
        searchResults: [],
        current_guest: '',
        show_guest_form: false
    }


    updateCurrentGuest = (guest) => {
        this.setState({
            show_guest_form: true,
            current_guest: guest,
        })
    }

    onChangeHandler = (e) => {
        if (e.target.name === "search") {
            this.setState({
                search: e.target.value
            }, () => this.fetchSearch(this.state.search))
        }
    }

    fetchSearch = (search) => {
        fetch(this.props.backendUrl + "/guests/?search=" + search)
            .then(res => res.json())
            .then(results => this.setState({
                    searchResults: results
                }
            ))
    }


    renderSearchResults = () => {
        if (this.state.search === ''){
            let limitedResults = []
            return limitedResults.map(result => <GuestSearchItem
                key={result.id}
                result={result}
                updateCurrentGuest={this.updateCurrentGuest}
                backendUrl={this.props.backendUrl}/>)

        } else {
            let newArray = [...this.state.searchResults]
            let limitedResults = newArray.splice(0, 10)
            return limitedResults.map(result => <GuestSearchItem
                key={result.id}
                result={result}
                updateCurrentGuest={this.updateCurrentGuest}/>)
        }
    }


    render(){
        return(
            <div className="guest-container" style={{position: "relative", top: "80px"}}>
                <div className="search-column-container">
                    <input id="search-container-header"
                           name="search"
                           placeholder="Guest Search"
                           onChange={this.onChangeHandler}
                           value={this.state.search}
                           autoComplete="off"></input>
                    {this.renderSearchResults()}
                </div>
                <div className="guest-form-container">
                    {this.state.show_guest_form ? <GuestInfoForm key={this.state.current_guest.id} guest={this.state.current_guest}/> : null}
                </div>
            </div>
        )
    }
}


export default GuestContainer