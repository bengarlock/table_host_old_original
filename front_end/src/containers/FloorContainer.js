import React from "react"
import Reservation from "../cards/Reservation";
import Table from "../cards/Table";
import "../stylesheets/FloorContainer.css"
import TableStatusForm from "../forms/TableStatusForm";
import { PENDING_RESERVATION_STATUSES, reservationForTable } from "../utils/floor";

class FloorContainer extends React.Component {
    state = {
        tables: [],
        restaurantId: null,
        currentTableId: null,
        loading: true,
        error: "",
        addingTable: false,
        newTableName: "",
        newTableShape: "fourTop",
        busyTableId: null,
        selectedReservationId: null
    }

    componentDidMount() {
        Promise.all([
            fetch(this.props.backendUrl + "/tables").then(this.readResponse),
            fetch(this.props.backendUrl + "/restaurants").then(this.readResponse)
        ]).then(([tables, restaurants]) => {
            this.setState({
                tables,
                restaurantId: tables[0] ? tables[0].restaurant_id : (restaurants[0] && restaurants[0].id),
                loading: false
            })
        }).catch(error => this.setState({loading: false, error: error.message}))
    }

    readResponse = (response) => response.json().then(body => {
        if (!response.ok) {
            throw new Error(body.error || (body.errors || []).join(", ") || "The request could not be completed")
        }
        return body
    })

    pendingReservations = () => this.props.slots.filter(slot =>
        slot.booked && PENDING_RESERVATION_STATUSES.includes(slot.status)
    )

    updateTable = (tableId, changes) => {
        this.setState({busyTableId: tableId, error: ""})
        return fetch(`${this.props.backendUrl}/tables/${tableId}`, {
            method: "PATCH",
            headers: {"content-type": "application/json", "accept": "application/json"},
            body: JSON.stringify({table: changes})
        }).then(this.readResponse).then(table => {
            this.setState(state => ({
                tables: state.tables.map(item => item.id === table.id ? table : item),
                busyTableId: null,
                currentTableId: changes.status === "done" ? null : state.currentTableId
            }))
            return table
        }).catch(error => {
            this.setState({busyTableId: null, error: error.message})
            throw error
        })
    }

    seatReservation = (table, reservationId) => {
        const reservation = this.props.slots.find(slot => slot.id === reservationId)
        if (!reservation || table.status !== "done" || this.state.busyTableId) return

        this.updateTable(table.id, {status: "seated", reservation_id: reservation.id}).then(updatedTable => {
            this.props.updateSlot({
                ...reservation,
                status: "seated",
                tables: Array.from(new Set([...(reservation.tables || []), updatedTable.name]))
            })
            this.setState({currentTableId: updatedTable.id, selectedReservationId: null})
        }).catch(() => {})
    }

    changeStatus = (status) => {
        const table = this.currentTable()
        if (!table) return
        const reservation = reservationForTable(table, this.props.slots)

        this.updateTable(table.id, {status}).then(() => {
            if (reservation) this.props.updateSlot({...reservation, status})
        }).catch(() => {})
    }

    currentTable = () => this.state.tables.find(table => table.id === this.state.currentTableId)

    createTable = (event) => {
        event.preventDefault()
        if (!this.state.restaurantId || !this.state.newTableName.trim()) return

        const index = this.state.tables.length
        const table = {
            name: this.state.newTableName.trim(),
            restaurant_id: this.state.restaurantId,
            class_name: this.state.newTableShape,
            position_left: `${40 + ((index % 6) * 82)}px`,
            position_top: `${40 + (Math.floor(index / 6) * 135)}px`
        }

        fetch(this.props.backendUrl + "/tables", {
            method: "POST",
            headers: {"content-type": "application/json", "accept": "application/json"},
            body: JSON.stringify({table})
        }).then(this.readResponse).then(createdTable => {
            this.setState(state => ({
                tables: [...state.tables, createdTable],
                addingTable: false,
                newTableName: "",
                error: ""
            }))
        }).catch(error => this.setState({error: error.message}))
    }

    renderReservations = () => {
        const reservations = this.pendingReservations()
        if (reservations.length === 0) {
            return <div className="floor-empty-list">All booked parties are seated or complete.</div>
        }
        return reservations.map(reservation => (
            <Reservation key={reservation.id}
                         reservation={reservation}
                         selected={this.state.selectedReservationId === reservation.id}
                         onSelect={() => this.setState({selectedReservationId: reservation.id})}/>
        ))
    }

    renderFloorPlan = () => this.state.tables.map(table => (
        <Table
            key={table.id}
            table={table}
            reservation={reservationForTable(table, this.props.slots)}
            busy={this.state.busyTableId === table.id}
            onDropReservation={this.seatReservation}
            onSelect={() => table.status === "done"
                ? this.state.selectedReservationId && this.seatReservation(table, this.state.selectedReservationId)
                : this.setState({currentTableId: table.id})}
        />
    ))

    renderAddTable = () => {
        if (!this.state.addingTable) {
            return <button className="floor-add-button" onClick={() => this.setState({addingTable: true})}>+ Add table</button>
        }
        return (
            <form className="floor-add-form" onSubmit={this.createTable}>
                <label htmlFor="new-table-name">
                    Table number
                    <input id="new-table-name" autoFocus value={this.state.newTableName}
                           onChange={event => this.setState({newTableName: event.target.value})}/>
                </label>
                <label htmlFor="new-table-shape">
                    Layout
                    <select id="new-table-shape" value={this.state.newTableShape}
                            onChange={event => this.setState({newTableShape: event.target.value})}>
                        <option value="two-top-horizontal">2-top · horizontal</option>
                        <option value="two-top-vertical">2-top · vertical</option>
                        <option value="fourTop">4-top</option>
                    </select>
                </label>
                <button type="submit">Create table</button>
                <button type="button" onClick={() => this.setState({addingTable: false})}>Cancel</button>
            </form>
        )
    }

    render() {
        const currentTable = this.currentTable()
        const seatedCount = this.state.tables.filter(table => table.status !== "done").length

        return (
            <main className="floor-page">
                <aside className="floor-reservations" aria-label="Pending reservations">
                    <div className="floor-sidebar-heading">
                        <div>
                            <span className="floor-eyebrow">Today&apos;s book</span>
                            <h1>Reservations</h1>
                        </div>
                        <span className="floor-count">{this.pendingReservations().length}</span>
                    </div>
                    <p className="floor-sidebar-help">Drag a party onto a table, or select the party and then an available table.</p>
                    <div className="floor-reservation-list">{this.renderReservations()}</div>
                </aside>

                <section className="floor-workspace">
                    <header className="floor-toolbar">
                        <div>
                            <span className="floor-eyebrow">Dining room</span>
                            <h2>Floor plan</h2>
                        </div>
                        <div className="floor-toolbar-actions">
                            <span className="floor-occupancy">{seatedCount} of {this.state.tables.length} occupied</span>
                            {this.renderAddTable()}
                        </div>
                    </header>

                    {this.state.error && <div className="floor-error" role="alert">{this.state.error}</div>}
                    {this.state.loading ? <div className="floor-loading">Loading floor plan…</div> : (
                        <div className="floor-canvas" aria-label="Restaurant table layout">
                            {this.renderFloorPlan()}
                        </div>
                    )}
                </section>

                {currentTable && (
                    <TableStatusForm
                        table={currentTable}
                        reservation={reservationForTable(currentTable, this.props.slots)}
                        busy={this.state.busyTableId === currentTable.id}
                        onClose={() => this.setState({currentTableId: null})}
                        onStatusChange={this.changeStatus}/>
                )}
            </main>
        )
    }
}

export default FloorContainer
