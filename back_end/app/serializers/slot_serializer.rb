class SlotSerializer < ActiveModel::Serializer
  attributes :id, :book_id, :guest_id, :guest, :booked, :time, :party_size, :status, :reservation_notes, :created_at, :updated_at


end
