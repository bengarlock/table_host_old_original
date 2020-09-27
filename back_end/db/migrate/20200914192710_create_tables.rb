class CreateTables < ActiveRecord::Migration[6.0]
  def change
    create_table :tables do |t|
      t.string :name
      t.integer :restaurant_id
      t.string :position_left
      t.string :position_top
      t.string :class_name
      t.string :status, default: "done"
      t.integer :reservation_id, default: 0

      t.timestamps
    end
  end
end
