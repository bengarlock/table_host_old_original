import React from "react"
import "../stylesheets/Forms.css"
import SearchItems from "../cards/SearchItems";

class NewReservationForm extends React.Component {

    state = {
        search: null,
        searchResults: []
    }

    onChangeHandler = (e) => {
        if (e.target.name === "search") {
            console.log(`"http://localhost:3000/search?q=${e.target.value}"`)
            this.setState({
                search: e.target.value
            })
            fetch("http://localhost:3000/search?q=" + e.target.value)
                .then(res => res.json())
                .then(results => this.setState({
                    searchResults: results
                }))
        }
    }

    renderSearchResults = () => {
        let limitedResults = this.state.searchResults.splice(0, 10)
        return limitedResults.map(result => <SearchItems key={result.id} result={result} newFormSetState={this.props.newFormSetState} modifyFormSetState={this.props.modifyFormSetState} updateGuest={this.props.updateGuest}/>)
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
                                <input type="text" value={this.state.search} name="search" placeholder="Guest Search" onChange={this.onChangeHandler} />
                            </div>
                            <div>
                                {this.renderSearchResults()}
                            </div>
                            <div className="submit-button">
                                <input style={{backgroundColor: "#486998", width: "150px" }} type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewReservationForm