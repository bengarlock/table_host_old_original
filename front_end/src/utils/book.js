export const bookIdForSlot = (slot) => {
    if (!slot) {
        return null
    }

    if (slot.book_id !== undefined && slot.book_id !== null) {
        return slot.book_id
    }

    if (slot.book && typeof slot.book === "object") {
        return slot.book.id
    }

    return slot.book
}
