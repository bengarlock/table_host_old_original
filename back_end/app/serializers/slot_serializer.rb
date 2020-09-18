class SlotSerializer < ActiveModel::Serializer
  attributes :id, :time, :party_size, :book_id, :guest, :reservation_notes, :created_at, :updated_at
end
