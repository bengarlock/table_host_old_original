import React from "react"
import "../stylesheets/Forms.css"

class NewReservationForm extends React.Component {

    state = {
        search: '',
        searchResults: ''
    }

    onChangeHandler = (e) => {

        if (e.target.name === "search") {
            this.setState({
                search: e.target.value
            })
            console.log("http://localhost:3000/search?search=" + `"${this.state.search}"`)

            fetch("http://localhost:3000/search?search=" + `"${this.state.search}"`)
                .then(res => res.json())
                .then(results => console.log(results))

        }

    }

    renderSearchResults = () => {
        return null
    }


    render(){
        return(
            <div id="wrapper">
                <div id="overlay">
                    <div id="reservation-form-container" >
                        <form className="reservation-form" onSubmit={this.onSubmitHandler} style={{cursor: "default"}}>
                            <div>
                                <div id="close" onClick={this.props.onClickHandler}>Close</div>
                                <h2>Search For Guest</h2>
                                <input type="text" value={this.state.search} name="search" placeholder="Guest Search" onChange={this.onChangeHandler} />
                            </div>
                            <div>
                                <input style={{backgroundColor: "#486998", top: "200px"}} type="submit" />
                            </div>
                            <div>
                                {this.renderSearchResults()}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewReservationForm