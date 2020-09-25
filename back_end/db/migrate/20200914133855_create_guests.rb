class CreateGuests < ActiveRecord::Migration[6.0]
  def change
    create_table :guests do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.string :guest_notes
      t.boolean :root_user, default: false

      t.timestamps
    end
  end
end
