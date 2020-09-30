class AddTabelsToSlots < ActiveRecord::Migration[6.0]
  def change
    add_column :slots, :tables, :string, array: true, default: []
  end
end
