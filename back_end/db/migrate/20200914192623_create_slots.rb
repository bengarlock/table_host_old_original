class CreateSlots < ActiveRecord::Migration[6.0]
  def change
    create_table :slots do |t|
      t.string :time
      t.integer :party_size
      t.integer :book_id

      t.timestamps
    end
  end
end
