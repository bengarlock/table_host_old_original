class SlotSerializer < ActiveModel::Serializer
  attributes :id, :book_id, :book, :guest, :booked, :time, :party_size, :status, :reservation_notes, :tables, :created_at, :updated_at
end
