class RemoveReservationNotesFromSlot < ActiveRecord::Migration[6.0]
  def change
    remove_column :slots, :reservation_notes, :string
  end
end
