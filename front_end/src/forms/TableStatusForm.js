import React from "react"
import "../stylesheets/TableStatusForm.css"
import { FLOOR_STATUSES, formatFloorStatus } from "../utils/floor";

const TableStatusForm = ({table, reservation, busy, onClose, onStatusChange}) => {
    const guest = reservation && reservation.guest

    return (
        <div className="table-status-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
            <section className="table-status-panel" aria-labelledby="table-status-title">
                <button className="table-status-close" onClick={onClose} aria-label="Close table status">×</button>
                <span className="floor-eyebrow">Table {table.name}</span>
                <h2 id="table-status-title">{guest ? `${guest.first_name} ${guest.last_name}` : "Seated party"}</h2>
                {reservation && <p>{reservation.time} · Party of {reservation.party_size}</p>}

                <div className="table-current-status">
                    <span>Current status</span>
                    <strong>{formatFloorStatus(table.status)}</strong>
                </div>

                <div className="table-status-options">
                    {FLOOR_STATUSES.map(status => (
                        <button key={status.value}
                                className={table.status === status.value ? "is-current" : ""}
                                disabled={busy || table.status === status.value}
                                onClick={() => onStatusChange(status.value)}>
                            <span className={`status-dot status-${status.value}`}/>
                            {status.label}
                        </button>
                    ))}
                </div>

                <button className="table-done-button" disabled={busy} onClick={() => onStatusChange("done")}>
                    {busy ? "Updating…" : "Mark done & clear table"}
                </button>
            </section>
        </div>
    )
}

export default TableStatusForm
