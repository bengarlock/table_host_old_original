class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :date
      t.integer :restaurant_id

      t.timestamps
    end
  end
end
