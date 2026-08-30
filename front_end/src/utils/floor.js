export const PENDING_RESERVATION_STATUSES = [
    "booked", "confirmed", "left-message", "no-answer", "wrong-number"
]

export const FLOOR_STATUSES = [
    {value: "seated", label: "Seated"},
    {value: "appetizer", label: "Appetizer"},
    {value: "entree", label: "Entree"},
    {value: "dessert", label: "Dessert"},
    {value: "check_dropped", label: "Check dropped"},
    {value: "paid", label: "Paid"}
]

export const formatFloorStatus = (status) => {
    if (status === "done") return "Available"
    const match = FLOOR_STATUSES.find(item => item.value === status)
    return match ? match.label : status
}

export const reservationForTable = (table, reservations) => {
    if (!table || !table.reservation_id) return null
    return reservations.find(reservation => reservation.id === table.reservation_id) || null
}
