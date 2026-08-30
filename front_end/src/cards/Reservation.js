import React from "react";
import "../stylesheets/ReservationFloorView.css"

const Reservation = ({reservation, selected, onSelect}) => {
    const guest = reservation.guest || {}

    const onDragStart = (event) => {
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.setData("application/x-tablehost-reservation", String(reservation.id))
        event.dataTransfer.setData("text/plain", String(reservation.id))
    }

    return (
        <article className={`floor-reservation-card ${selected ? "is-selected" : ""}`}
                 draggable="true"
                 onDragStart={onDragStart}
                 onClick={onSelect}
                 onKeyDown={event => (event.key === "Enter" || event.key === " ") && onSelect()}
                 role="button"
                 tabIndex="0"
                 aria-pressed={selected}>
            <div className="floor-reservation-time">{reservation.time}</div>
            <div className="floor-reservation-details">
                <h3>{guest.first_name} {guest.last_name}</h3>
                <span>Party of {reservation.party_size}</span>
                {reservation.reservation_notes && <p>{reservation.reservation_notes}</p>}
            </div>
            <span className="floor-drag-handle" aria-hidden="true">⠿</span>
        </article>
    )
}

export default Reservation
