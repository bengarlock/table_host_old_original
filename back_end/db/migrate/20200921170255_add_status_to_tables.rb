class AddStatusToTables < ActiveRecord::Migration[6.0]
  def change
    add_column :tables, :status, :string, default: "open"
  end
end
