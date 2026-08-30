import React from "react"
import "../stylesheets/Table.css"
import { formatFloorStatus } from "../utils/floor";

const Table = ({table, reservation, busy, onDropReservation, onSelect}) => {
    const available = table.status === "done"
    const guest = reservation && reservation.guest

    const onDrop = (event) => {
        event.preventDefault()
        const value = event.dataTransfer.getData("application/x-tablehost-reservation") || event.dataTransfer.getData("text/plain")
        const reservationId = Number(value)
        if (available && reservationId) onDropReservation(table, reservationId)
    }

    const onKeyDown = (event) => {
        if ((event.key === "Enter" || event.key === " ") && !available) {
            event.preventDefault()
            onSelect()
        }
    }

    return (
        <div className={`floor-table-node ${table.class_name} status-${table.status} ${available ? "is-available" : "is-occupied"} ${busy ? "is-busy" : ""}`}
             style={{left: table.position_left, top: table.position_top}}
             onDragOver={event => available && event.preventDefault()}
             onDrop={onDrop}
             onClick={onSelect}
             onKeyDown={onKeyDown}
             role="button"
             tabIndex="0"
             aria-label={`Table ${table.name}, ${formatFloorStatus(table.status)}`}>
            <span className="chair chair-top"/>
            <span className="chair chair-right"/>
            <span className="chair chair-bottom"/>
            <span className="chair chair-left"/>
            <div className={`table-surface ${table.class_name}`}>
                <strong>{table.name}</strong>
                <small>{available ? "Available" : formatFloorStatus(table.status)}</small>
            </div>
            {!available && guest && (
                <div className="floor-table-party">
                    {guest.last_name || guest.first_name} · {reservation.party_size}
                </div>
            )}
        </div>
    )
}

export default Table
