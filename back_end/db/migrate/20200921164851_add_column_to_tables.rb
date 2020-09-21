class AddColumnToTables < ActiveRecord::Migration[6.0]
  def change
    add_column :tables, :class_name, :string
    add_column :tables, :position_left, :string
    add_column :tables, :position_top, :string
  end
end
