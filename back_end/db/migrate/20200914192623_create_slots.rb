class CreateSlots < ActiveRecord::Migration[6.0]
  def change
    create_table :slots do |t|
      t.string :time
      t.integer :party_size
      t.string :status, default: ''
      t.string :reservation_notes, default: ''
      t.boolean :booked, default: false
      t.integer :book_id
      t.integer :guest_id, default: 0

      t.timestamps
    end
  end
end
