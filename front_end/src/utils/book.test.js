import { bookIdForSlot } from "./book"

test("uses the explicit book_id from a slot", () => {
    expect(bookIdForSlot({book_id: 12, book: {id: 8}})).toBe(12)
})

test("supports the existing nested book response", () => {
    expect(bookIdForSlot({book: {id: 8}})).toBe(8)
})

test("supports legacy scalar book responses", () => {
    expect(bookIdForSlot({book: 5})).toBe(5)
})
