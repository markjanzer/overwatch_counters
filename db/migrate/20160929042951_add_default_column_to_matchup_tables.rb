class AddDefaultColumnToMatchupTables < ActiveRecord::Migration
  def change
    add_column :matchup_tables, :default, :boolean, default: false
  end
end
