import { formatFloorStatus, reservationForTable } from "./floor"

test("formats floor statuses for people", () => {
    expect(formatFloorStatus("check_dropped")).toBe("Check dropped")
    expect(formatFloorStatus("done")).toBe("Available")
})

test("finds the reservation seated at a table", () => {
    const reservations = [{id: 4}, {id: 9}]
    expect(reservationForTable({reservation_id: 9}, reservations)).toEqual({id: 9})
    expect(reservationForTable({reservation_id: 0}, reservations)).toBeNull()
})
