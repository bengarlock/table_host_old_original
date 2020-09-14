class CreateReservations < ActiveRecord::Migration[6.0]
  def change
    create_table :reservations do |t|
      t.integer :guest_id
      t.integer :slot_id

      t.timestamps
    end
  end
end
