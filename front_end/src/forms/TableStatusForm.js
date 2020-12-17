import React from 'react'
import "../stylesheets/Forms.css"

class TableStatusForm extends React.Component {


    onClickHandler = (e) => {
        e.preventDefault()
        this.props.table.status = e.target.name
        this.props.updateTableArray(this.props.table)
        this.props.renderStatusForm()
        this.props.table.status = e.target.name

        const data = {
            status: e.target.name
        }

        const packet = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(data)
        }

        this.updateSlot(data, packet)
        this.updateTable(data, packet)

    }

    updateTable = (data, packet) => {
        fetch("https://database.bengarlock.com/tables/" + this.props.table.id +"/" , packet)
            .then(res => res.json())

    }

    updateSlot = (data, packet) => {
        fetch("https://database.bengarlock.com/slots/" + this.props.table.reservation_id + "/", packet)
            .then(res => res.json())
    }


    render() {
        return(
            <div id="wrapper">
                <div id="overlay">
                    <div id="reservation-form-container" >
                        <form className="reservation-form" onSubmit={this.onSubmitHandler} >
                            <div>
                                <h2>Table Status - {this.props.table.name}</h2>
                            </div>
                            <input style={{backgroundColor: "red"}} type="button" value="Appetizer" name="appetizer" onClick={this.onClickHandler} />
                            <input style={{backgroundColor: "orange"}} type="button" value="Entree" name="entree" onClick={this.onClickHandler} />
                            <input style={{backgroundColor: "#aa2dfc"}} type="button" value="Dessert" name="dessert" onClick={this.onClickHandler} />
                            <input style={{backgroundColor: "#23fa5c"}} type="button" value="Check Dropped" name="check_dropped" onClick={this.onClickHandler} />
                            <input style={{backgroundColor: "green"}} type="button" value="Paid" name="paid" onClick={this.onClickHandler} />
                            <div>
                                <input style={{backgroundColor: "grey"}} type="button" value="Done" name="done" onClick={this.onClickHandler} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default TableStatusForm

