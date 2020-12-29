import React from "react"
import Reservation from "../cards/Reservation";
import Table from "../cards/Table";
import "../stylesheets/FloorContainer.css"
import TableStatusForm from "../forms/TableStatusForm";



class FloorContainer extends React.Component {

    state = {
        tables: [],
        reservations: [],
        current_reservation: '',
        current_table: '',
        render_status_form: false,
    }

    componentDidMount() {
        fetch(this.props.backendUrl + "/tables/")
            .then(res => res.json())
            .then(tables => this.setState({
                tables: tables
            }))
    }

    updateReservation = (reservation) => {
        this.setState({
            current_reservation: reservation
        })
    }

    updateSeatedTable = (table) => {
        const updateReservation = this.state.current_reservation
        updateReservation.status = "seated"

        this.setState({
            current_reservation : updateReservation,
            table_status: 'seated'
        })

        const slotData = {
            status: 'seated'
        }

        const tableData = {
            status: 'seated',
            reservation_id: this.state.current_reservation.id
        }

        const slotPacket = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(slotData)
        }

        const tablePacket = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(tableData)
        }

        //updates table status in API as well as Slot to seated.
        fetch(this.props.backendUrl + "/tables/" + table.id + "/", tablePacket)
            .then(res => res.json())

        fetch(this.props.backendUrl + "/slots/" + this.state.current_reservation.id + "/", slotPacket)
            .then(res => res.json())
    }

    updateTableArray = (table) => {
        const newArray = [...this.state.tables]
        const tableToUpdate = newArray.find(item => {
            return item.id === table.id
        })
        tableToUpdate.status = table.status

        this.setState({
            tables: newArray
        })
    }

    renderStatusForm = (table) => {
        this.setState({
            render_status_form: !this.state.render_status_form,
            current_table: table
        })
    }

    renderReservations = () => {
        let bookedResos = this.props.slots.filter(item => (item.booked))

        let bookedStatusResos = bookedResos.filter(item =>
            (item.status === 'booked') ||
            (item.status === 'confirmed') ||
            (item.status === 'left-message') ||
            (item.status === 'no-answer') ||
            (item.status === 'wrong-number')
        )

        return bookedStatusResos.map(reservation => <Reservation
            key={reservation.id}
            reservation={reservation}
            updateReservation={this.updateReservation}/>)
    }

    renderFloorPlan = () => {
        return this.state.tables.map(table => <Table
            key={table.id} table={table}
            updateSeatedTable={this.updateSeatedTable}
            renderStatusForm={this.renderStatusForm} />)
    }

    render() {
        return(
            <div className="floorplan-container" style={{position: "relative", top: "80px"}}>
                <div className="reservation-container">
                    <div id="reservations-container-header">Reservations</div>
                    <div>{this.renderReservations()}</div>
                </div>
                <div className="floorplan-tables">
                    {this.renderFloorPlan()}
                </div>
                <div>
                    {this.state.render_status_form ?
                        <TableStatusForm
                            table={this.state.current_table}
                            renderStatusForm={this.renderStatusForm}
                            updateTableArray={this.updateTableArray}/> : null}
                </div>
            </div>

        )
    }
}

export default FloorContainer